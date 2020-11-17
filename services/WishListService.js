const { WishListRepository } = require('../repository');

class WishListService {
    constructor(container) {
        this.wishlistRepository = container.get(WishListRepository);
    }

    async getAllWishList(id) {
        return await this.wishlistRepository.findWishList(id);
    }

    async store({ customerId, productId }) {
        try {
            const result = await this.wishlistRepository.findOneByAttribute({attributes: ['id'],where: {customerId, productId}});
            if(result) throw { status: 400, body: 'Sản phẩm này đã tồn tại trong danh sách' };
            await this.wishlistRepository.create({ customerId, productId });
            return { status: 201, body: 'Đã thêm vào danh sách yêu thích' };
        } catch (err) {
            if(err) throw err;
            throw { status: 400, body: 'Thêm thất bại' };
        }
    }

    async remove(id,force) {
        try {
            await this.wishlistRepository.remove(id,force);
            return { status: 200, body: 'Xóa thành công'};
        }catch (e) {
            console.log(e);
            throw {status: 400, body: 'Xóa thất bại'};
        }
    }
}
module.exports = WishListService;