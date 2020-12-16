const router = require('express').Router(),
    { ConversationController } = require('../../controllers/api');

router.post('/', ConversationController.create)

module.exports = router;