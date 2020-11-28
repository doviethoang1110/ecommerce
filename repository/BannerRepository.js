const Repository = require('./Repository'),
    { banners } = require('../models');
class BannerRepository extends Repository {
    constructor() {
        super(banners);
    }
}
module.exports = BannerRepository;