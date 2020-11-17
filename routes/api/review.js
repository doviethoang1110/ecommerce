const router = require('express').Router(),
    { ReviewController } = require('../../controllers/api');

router.get('/', ReviewController.index)
    .patch('/:id', ReviewController.update)
    .delete('/:id', ReviewController.remove);

module.exports = router;