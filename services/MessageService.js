const { MessageRepository } = require('../repository');

class MessageService {
    constructor(container) {
        this.messageRepository = container.get(MessageRepository);
    }
}

module.exports = MessageService;