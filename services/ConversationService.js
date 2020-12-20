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

    async findConversationById(id, type, page) {
        try {
            return await this.conversationRepository.findById(id, type, page);
        }catch (error) {
            console.log(error);
            throw error;
        }
    }

    async loadMoreMessages(id, type, page) {
        try {
            return await this.conversationRepository.loadMore(id, type, page);
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

    async createGroupConversation({name, type, creatorId, participants}) {
        try {
            const conversation = await this.conversationRepository.create({name, creatorId, type});
            conversation.addUsers(participants);
            const {id, name:conversationName, image:conversationImage, updatedAt} = conversation;
            return {id, conversationName, conversationImage, updatedAt}
        }catch (error) {
            console.log(error)
            throw error;
        }
    }

    async createNewConversation({creatorId, participants, message, userId, conversationId, type:conversationType, name, image}) {
        let messages;
        let doc;
        if(!conversationId) {
            const conversation = await this.conversationRepository.create({creatorId});
            messages = await this.messageRepository.create({userId, message, conversationId: conversation.id});
            await Promise.all([
                conversation.addUsers(participants),
                this.conversationRepository.update(conversation.id, {lastMessageId: messages.id})
            ]);
        }else {
            messages = await this.messageRepository.create({userId, message, conversationId});
            doc = await this.conversationRepository.update(conversationId, {lastMessageId: messages.id});
        }
        const {id, type, createdAt} = messages;
        const {updatedAt} = doc[1][0].dataValues;
        return conversationType === 'group'
            ? {id, message, type, name, image, userId, createdAt, conversationId, conversationType, updatedAt}
        : {id, message, type, userId, createdAt, conversationId, conversationType, updatedAt};
    }

}
module.exports = ConversationService;