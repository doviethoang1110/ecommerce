const Repository = require('./Repository'),
    { blogs } = require('../models');
class BlogRepository extends Repository {
    constructor() {
        super(blogs);
    }
}
module.exports = BlogRepository;