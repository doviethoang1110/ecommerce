const router = require('express').Router(),
    { ConversationController } = require('../../controllers/api');

router.get("/:id", ConversationController.findConversationById)

module.exports = router;