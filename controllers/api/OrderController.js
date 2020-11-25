const { OrderService } = require('../../container');

module.exports.index = async (req, res) => {
    let list = await OrderService.getAllPermissions();
    res.api(200, list);
}