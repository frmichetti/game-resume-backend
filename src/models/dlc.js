'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DLC extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Steam, {foreignKey: 'app_id', as: 'steam_owner'});
      this.belongsTo(models.Wii, {foreignKey: 'app_id', as: 'wii_owner'})
    }
  }
  DLC.init({
    app_id: DataTypes.STRING,
    title: DataTypes.STRING,
    finished: DataTypes.BOOLEAN,
    finished_at: DataTypes.DATE,
    collection: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'DLC',
    tableName: 'DLC',
  });
  return DLC;
};