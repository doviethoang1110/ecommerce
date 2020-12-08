const Repository = require('./Repository'),
    { participants } = require('../models');
class ParticipantRepository extends Repository {
    constructor() {
        super(participants);
    }
}
module.exports = ParticipantRepository;