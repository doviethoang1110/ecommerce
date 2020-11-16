const Repository = require('./Repository'),
    { tokens } = require('../models');
class TokenRepository extends Repository {
    constructor() {
        super(tokens);
    }
}
module.exports = TokenRepository;