const Repository = require('./Repository'),
    { conversations } = require('../models');
class ConversationRepository extends Repository {
    constructor() {
        super(conversations);
    }
}
module.exports = ConversationRepository;