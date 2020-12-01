const Repository = require('./Repository'),
    { refreshTokens } = require('../models');
class RefreshTokenRepository extends Repository {
    constructor() {
        super(refreshTokens);
    }
}
module.exports = RefreshTokenRepository;