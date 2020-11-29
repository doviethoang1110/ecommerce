const Repository = require('./Repository'),

    { products,brands,categories,skus,sequelize } = require('../models');
const { QueryTypes } = require('sequelize');

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

    async findCategoriesOfProduct(id) {
        return await products.findByPk(id, {
            attributes: [],
            include: {
                model:categories,
                as:'categories',
                attributes:['id'],
                through:{ attributes:[] }
            },
        });
    }

    async findById(id) {
        return await products.findByPk(id,
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

    async countProducts() {
        return await products.count();
    }

    async paginate({page = 0, brand, price, sort, pageSize }) {
        let where = "where p.status = true and p.deletedAt is null ";
        let order = "";
        if(sort) {
            let [key, value] = sort.split("-");
            key = key === "price" ? "s.exportPrice" : `p.${key}`;
            order = `order by ${key} ${value}`;
        }
        if(brand) where += `and b.slug like "${brand}" `;
        if(price) {
            const [from, to] = price.split("-");
            where += `and s.exportPrice between ${from} and ${to} `;
        }
        const query = `
                select p.id,p.name,p.discount,p.priority,p.slug,p.image,min(s.exportPrice) as priceFrom, max(s.exportPrice) as priceTo 
                from Products p inner join Skus s on s.product_id = p.id inner join Brands b on b.id = p.brand_id 
                ${where}
                group by ${(sort &&sort.startsWith('price')) ? "s.id" : "p.name"} 
                ${order}
                limit ${page * pageSize}, ${pageSize}
            `;
        return await
            sequelize.query(query, {type: QueryTypes.SELECT});
    }

    async getProductForIndex(where = "") {
        return await sequelize.query(`
            select p.id,p.name,p.discount,p.priority,p.slug,p.image,min(s.exportPrice) as priceFrom, max(s.exportPrice) as priceTo 
                from Products p inner join Skus s on s.product_id = p.id 
                where p.status = true and p.deletedAt is null ${where}
                group by p.name
        `, {type: QueryTypes.SELECT});
    }

    async findRestore({where}) {
        return await products.findAll({
            attributes: ['id','name','image'],
            include: {
                model: brands,
                as: 'brand',
                attributes: ['name']
            },
            where,
            paranoid: false
        });
    }

    async restore(id) {
        try {
            const data = await Promise.all([products.restore({where: {id}}),
                products.findByPk(id,
                    {
                        paranoid: false,
                        attributes: ['name','priority','vision','status','image','id'],
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
                    }
                )]);
            return data[1];
        }catch (err) {
            console.log(err);
            if(err) throw err;
        }
    }
}
module.exports = ProductRepository;