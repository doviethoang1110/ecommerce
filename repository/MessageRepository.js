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

}
module.exports = MessageRepository;