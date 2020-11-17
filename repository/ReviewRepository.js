const Repository = require('./Repository'),
    { reviews } = require('../models');
class ReviewRepository extends Repository {
    constructor() {
        super(reviews);
    }
}
module.exports = ReviewRepository;