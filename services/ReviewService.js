const { ReviewRepository } = require('../repository');
const sequelize = require('sequelize');

class ReviewService {
    constructor(container) {
        this.reviewRepository = container.get(ReviewRepository);
    }

    async store(review) {
        try {
            await this.reviewRepository.create(review);
            return { status: 201, body: {message: 'Gửi đánh giá thành công'} };
        } catch (err) {
            console.log(err)
            throw { status: 400, body: err };
        }
    }
}
module.exports = ReviewService;