const router = require('express').Router(),
    { UserController } = require('../../controllers/api');

router.get('/', UserController.index)
    .get('/:id', UserController.edit)
    .post('/login', UserController.login)
    .put('/:id', UserController.update)
    .post('/register', UserController.register);

module.exports = router;