'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {};
  Order.init({
    customerId: {
      type:DataTypes.INTEGER,
      validate:{
        notEmpty:{
          args:true,
          msg:'Mã người dùng không được trống'
        },
      }
    },
    currency: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          args:true,
          msg:'Mệnh giá không được trống'
        },
      }
    },
    rate: {
      type:DataTypes.FLOAT,
      validate:{
        notEmpty:{
          args:true,
          msg:'Tỷ lệ không được trống'
        },
      }
    },
    name: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          args:true,
          msg:'Tên người nhận không được trống'
        },
      }
    },
    address: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          args:true,
          msg:'Địa chỉ người nhận không được trống'
        },
      }
    },
    phone: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          args:true,
          msg:'Số điện thoại người nhận không được trống'
        },
      }
    },
    email: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          args:true,
          msg:'Email người nhận không được trống'
        },
      }
    },
    note: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          args:true,
          msg:'Nội dung không được trống'
        },
      }
    },
    paymentStatusId: {
      type:DataTypes.INTEGER,
      validate:{
        notEmpty:{
          args:true,
          msg:'Trạng thái thanh toán không được trống'
        },
      }
    },
    shippingStatusId: {
      type:DataTypes.INTEGER,
      validate:{
        notEmpty:{
          args:true,
          msg:'Trạng thái vận chuyển không được trống'
        },
      }
    },
    orderStatusId: {
      type:DataTypes.INTEGER,
      validate:{
        notEmpty:{
          args:true,
          msg:'Trạng thái đơn hàng không được trống'
        },
      }
    },
    shipping: {
      type:DataTypes.INTEGER,
      validate:{
        notEmpty:{
          args:true,
          msg:'Tiền ship không được trống'
        },
      }
    },
    shippingMethod: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          args:true,
          msg:'Phương thức vận chuyển không được trống'
        },
      }
    },
    paymentMethod: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          args:true,
          msg:'Phương thức thanh toán không được trống'
        },
      }
    },
    coupon: {
      type:DataTypes.STRING
    },
    subTotal: {
      type:DataTypes.FLOAT,
      validate:{
        notEmpty:{
          args:true,
          msg:'Tạm tính không được trống'
        },
      }
    },
    total: {
      type:DataTypes.FLOAT,
      validate:{
        notEmpty:{
          args:true,
          msg:'Tổng tiền không được trống'
        },
      }
    },
  }, {
    sequelize,
    timestamps: true,
    paranoid: true,
    modelName: 'Order',
  });
  return Order;
};