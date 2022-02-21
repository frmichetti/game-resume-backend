'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Wii extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.DLC, {foreignKey: 'app_id', as: 'dlcs'});
      this.belongsToMany(models.Category, {foreignKey: 'category_id', through: 'GamesCategories', as: 'categories'});
    }
  }
  Wii.init({
    app_id: DataTypes.STRING,
    title: DataTypes.STRING,
    finished: DataTypes.BOOLEAN,
    finished_at: DataTypes.DATE,
    collection: DataTypes.BOOLEAN,
    genuine: DataTypes.BOOLEAN,
    fisical_disc: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Wii',
    tableName: 'Wii'
  });
  return Wii;
};