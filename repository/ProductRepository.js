const Repository = require('./Repository'),
    { products,brands,categories,skus } = require('../models');
class ProductRepository extends Repository {
    constructor() {
        super(products);
    }
    async findAllProductsAdmin() {
        let data = await products.findAll({
            attributes:['name','priority','vision','status','image','id'],
            include:[
                {
                    model:brands,
                    as:'brand',
                    attributes:['name']
                },
                {
                    model:categories,
                    as:'categories',
                    attributes:['name'],
                    through:{ attributes:[] }
                }
            ]
        })
        return data;
    }
    async findById(id) {
        return products.findByPk(id,
            {
                attributes: ['id','name','discount','description','status','vision','priority','image','imageList'],
                include: [
                    {
                        model:brands,
                        as:'brand',
                        attributes:['id']
                    },
                    {
                        model:categories,
                        as:'categories',
                        attributes:['id'],
                        through:{ attributes:[] }
                    },
                    {
                        model:skus,
                        as:'skus',
                        attributes:['id','values','exportPrice','importPrice','stock','code'],
                    }
                ]
            });
    }
}
module.exports = ProductRepository;