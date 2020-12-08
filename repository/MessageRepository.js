const Repository = require('./Repository'),
    { messages } = require('../models');
class MessageRepository extends Repository {
    constructor() {
        super(messages);
    }
}
module.exports = MessageRepository;