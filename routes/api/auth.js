const router = require('express').Router(),
    { UserController } = require('../../controllers/api');

router.post('/login', UserController.login)
    .post('/refreshToken', UserController.refreshToken)
    .post('/register', UserController.register);

module.exports = router;