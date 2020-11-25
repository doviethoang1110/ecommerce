'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderDetail extends Model {};
  OrderDetail.init({
    orderId: {
      type: DataTypes.INTEGER,
      validate:{
        notEmpty:{
          args:true,
          msg:'Mã đơn hàng không được trống'
        },
      }
    },
    productId: {
      type: DataTypes.INTEGER,
      validate:{
        notEmpty:{
          args:true,
          msg:'Mã sản phẩm không được trống'
        },
      }
    },
    sku: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          args:true,
          msg:'Mã sku không được trống'
        },
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      validate:{
        notEmpty:{
          args:true,
          msg:'Số lượng không được trống'
        },
      }
    },
    price: {
      type: DataTypes.FLOAT,
      validate:{
        notEmpty:{
          args:true,
          msg:'Giá không được trống'
        },
      }
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    timestamps: true,
    modelName: 'OrderDetail',
  });
  return OrderDetail;
};