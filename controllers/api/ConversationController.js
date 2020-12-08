const { ConversationService } = require('../../container');

module.exports.index = async (req, res, next) => {
    res.api(200, await ConversationService.getAllConservations());
}