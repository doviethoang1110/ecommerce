const { ConversationRepository, MessageRepository } = require('../repository');

class ConversationService {
    constructor(container) {
        this.conversationRepository = container.get(ConversationRepository);
        this.messageRepository = container.get(MessageRepository);
    }

    async getAllConversationsOfUser(id) {
        try {
            return await this.conversationRepository.findConversationOfUser(id);
        }catch (error) {
            console.log(error)
            throw error;
        }
    }

    async findConversationById(id, type) {
        try {
            return await this.conversationRepository.findById(id, type);
            // return await this.messageRepository.findMessagesOfConversation(id, type);
        }catch (error) {
            console.log(error);
            throw error;
        }
    }

    async findConversation(creatorId, userId) {
        try {
            let response = {id: null, name: "", displayName: "", image: "", messages: []};
            const [data] = await this.conversationRepository.newChat(creatorId, userId);
            if(data) {
                response.messages = await this.messageRepository.find({
                    attributes: ['id','userId','type','message','createdAt'],
                    where: {conversationId: data.id}
                });
                response = {...response, ...data};
            }
            return response;
        }catch (e) {
            console.log(e)
        }
    }

    async createNewConversation({creatorId, participants, message, userId, conversationId}) {
        let messages;
        if(!conversationId) {
            const conversation = await this.conversationRepository.create({creatorId});
            messages = await this.messageRepository.create({userId, message, conversationId: conversation.id});
            await Promise.all([
                conversation.addUsers(participants),
                this.conversationRepository.update(conversation.id, {lastMessageId: messages.id})
            ]);
        }else {
            messages = await this.messageRepository.create({userId, message, conversationId});
            const doc = await this.conversationRepository.update(conversationId, {lastMessageId: messages.id});
        }
        let {id,message:content,type,userId:senderId,createdAt,conversation} = await this.messageRepository.findOne(messages.id);
        const {id: conId, type: conversationType, updatedAt} = conversation;
        return {id, content,type,senderId,createdAt, conId, conversationType, updatedAt};
    }

}
module.exports = ConversationService;