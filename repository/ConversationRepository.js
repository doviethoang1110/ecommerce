const Repository = require('./Repository'),
    { conversations, messages, users, participants, userDetails, sequelize, Sequelize } = require('../models');
const { QueryTypes, Op } = require('sequelize');

class ConversationRepository extends Repository {
    constructor() {
        super(conversations);
    }

    async newChat(creatorId, userId) {
        return await sequelize.query(`
            select c.id,u.id as 'userId',u.name,ud.displayName,ud.image from Conversations c 
            left JOIN Participants p on p.conversationId = c.id 
            left JOIN Users u on u.id = p.userId
            left JOIN UserDetails ud on ud.userId = u.id
            where c.type = 'single' and p.userId = ${userId} and c.deletedAt is NULL and c.id = (
            select \`newTable\`.conversationId from (select p.conversationId, count(*) as 'times'
            from Participants p where p.userId = ${creatorId} or p.userId = ${userId}
            GROUP BY p.conversationId) as \`newTable\` where \`newTable\`.times = 2)
        `, {type: QueryTypes.SELECT});
    }

    async findConversationOfUser(id) {
        return await sequelize.query(`
            select p.conversationId as 'id',u1.name as 'userName',ud1.displayName as 'userDisplayName',ud1.image as 'userImage',
            m.message,c.type,c.name as 'conversationName',c.image as 'conversationImage',u2.id as 'senderId',u2.name as 'senderName',
            ud2.displayName as 'senderDisplayName',c.updatedAt
            from Participants p 
            inner JOIN Conversations c on c.id = p.conversationId
            INNER JOIN (select p.conversationId,max(p.userId) as 'userId'
            from Participants p where p.conversationId in (select p.conversationId 
            from Participants p 
            where p.userId  = ${id}) and p.userId != ${id} group by p.conversationId) as \`temp\` on temp.conversationId = c.id
            INNER JOIN Users u1 on u1.id = temp.userId
            INNER JOIN UserDetails ud1 on ud1.userId = u1.id
            LEFT JOIN Messages m on m.id = c.lastMessageId
            LEFT JOIN Users u2 on u2.id = m.userId
            LEFT JOIN UserDetails ud2 on ud2.userId = u2.id
            where p.userId = ${id}
        `, {type: QueryTypes.SELECT});
    }

    async findById(id, type, page) {
        let select = '';
        let join = '';
        const conversation = {
            participants: [],
            messages: [],
            totalPages: null
        }
        if(type === 'group') {
            select = ',u.name,ud.displayName,ud.image';
            join = 'INNER JOIN Users u on u.id = m.userId INNER JOIN UserDetails ud on ud.userId = u.id'
        }
        const [totalPages, participants, messages] = await Promise.all([
            sequelize.query(`
            select ROUND(count(m.id)/6) AS 'totalPages' FROM Messages m where m.conversationId = ${id}
            `, {type: QueryTypes.SELECT}),
            conversations.findByPk(id, {
                attributes: [],
                include: [
                    {
                        model: users,
                        as: 'users',
                        attributes: ['id'],
                        through: {attributes: []}
                    }
                ]
            }),
            sequelize.query(`
            select m.type,m.userId,m.createdAt,m.message${select}
            from Messages m
            ${join}
            where m.conversationId = ${id}
            order by m.id desc limit ${page*6},6
        `, {type: QueryTypes.SELECT})
        ]);
        conversation.totalPages = totalPages[0].totalPages;
        conversation.messages = messages;
        conversation.participants = participants;
        return conversation;
    }

    async loadMore(id, type, page) {
        let select = '';
        let join = '';
        if(type === 'group') {
            select = ',u.name,ud.displayName,ud.image';
            join = 'INNER JOIN Users u on u.id = m.userId INNER JOIN UserDetails ud on ud.userId = u.id'
        }
        return await sequelize.query(`
            select m.type,m.userId,m.createdAt,m.message${select}
            from Messages m
            ${join}
            where m.conversationId = ${id}
            order by m.id desc limit ${page*6},6
        `, {type: QueryTypes.SELECT})
    }

}
module.exports = ConversationRepository;