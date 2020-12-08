const { ParticipantRepository } = require('../repository');

class ParticipantService {
    constructor(container) {
        this.participantRepository = container.get(ParticipantRepository);
    }
}
module.exports = ParticipantService;