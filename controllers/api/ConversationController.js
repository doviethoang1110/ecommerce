const { ConversationService } = require('../../container');

module.exports.findConversationById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const type = req.query.type;
        if(isNaN(id) || !type) throw new Error('không tồn truyền đủ tham số');
        res.api(200, await ConversationService.findConversationById(id, type));
    }catch (error) {
        next(error)
    }
}