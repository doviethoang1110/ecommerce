const Repository = require('./Repository'),
    { messages, conversations, userDetails } = require('../models');
class MessageRepository extends Repository {
    constructor() {
        super(messages);
    }

    async findOne(id) {
        return await messages.findByPk(id, {
            attributes: ['id','message','type','userId','createdAt'],
            include: {
                model: conversations,
                as: 'conversation',
                attributes: ['id','type','updatedAt']
            }
        })
    }

    async findMessagesOfConversation(id, type) {
        if(type === "single") {
            return await messages.findAll({
                attributes: ['type','message','userId','createdAt'],
                where: {conversationId: id}
            });
        } else {
            return await messages.findAll({
                attributes: ['type','message','createdAt'],
                include: {
                    model: users,
                    as: 'user',
                    attributes: ['id','name'],
                    include: {
                        model: userDetails,
                        as: 'userDetail',
                        attributes: ['displayName','image']
                    }
                },
                where: {conversationId: id}
            });
        }
    }
}
module.exports = MessageRepository;