const router = require('express').Router(),
    { RoleController } = require('../../controllers/api');

router.get('/', RoleController.index);

module.exports = router;