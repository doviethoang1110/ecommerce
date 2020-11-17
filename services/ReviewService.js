const { ReviewRepository } = require('../repository');
const sequelize = require('sequelize');

class ReviewService {
    constructor(container) {
        this.reviewRepository = container.get(ReviewRepository);
    }

    async getAllReviews() {
        return await this.reviewRepository.find({attributes: ['id','name','email','content','rating','status']});
    }

    async getProductReviews(id) {
        return await this.reviewRepository.find({
            attributes: ['id','name','content','rating','createdAt'],
            where: {status: true, productId: id}});
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

    async update(param,review) {
        try {
            let doc = await this.reviewRepository.update(param,review);
            let {id,name,email,rating,content,status} = doc[1][0].dataValues;
            return { status: 200, body: {id,name,email,rating,content,status} };
        } catch (err) {
            console.log(err)
            throw { status: 400, body: err };
        }
    }

    async remove(id,force) {
        try {
            let doc = await this.reviewRepository.remove(id,force);
            return { status: 200, body: doc};
        }catch (e) {
            console.log(e);
            throw {status: 400, body: e};
        }
    }
}
module.exports = ReviewService;