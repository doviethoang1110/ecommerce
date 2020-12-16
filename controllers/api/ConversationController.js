const { ConversationService } = require('../../container');

module.exports.create = async (req, res, next) => {
    try {
        const doc = await ConversationService.createGroupConversation(req.body);
        res.api(201, doc);
    }catch (error) {
        next(error);
    }
}