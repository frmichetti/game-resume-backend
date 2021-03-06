'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ToBuy extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ToBuy.init({
    title: DataTypes.STRING,
    finished: DataTypes.BOOLEAN,
    finished_at: DataTypes.DATE,    
    system: DataTypes.STRING,
    magnetic_link: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'ToBuy',
    tableName: 'ToBuy',
    underscored: true
  });
  return ToBuy;
};