'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OptionValue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  OptionValue.init({
    name: DataTypes.STRING,
    option_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'OptionValue',
  });
  return OptionValue;
};