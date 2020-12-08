const { ConversationRepository } = require('../repository');

class ConversationService {
    constructor(container) {
        this.conversationRepository = container.get(ConversationRepository);
    }

}
module.exports = ConversationService;