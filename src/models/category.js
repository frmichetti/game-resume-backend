'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Steam, {foreignKey: 'category_id', through: 'GamesCategories', as: 'steam_categories'});  
      this.belongsToMany(models.Ubisoft, {foreignKey: 'category_id', through: 'GamesCategories', as: 'ubisoft_categories'});  
      this.belongsToMany(models.Origin, {foreignKey: 'category_id', through: 'GamesCategories', as: 'origin_categories'});
      this.belongsToMany(models.WiiU, {foreignKey: 'category_id', through: 'GamesCategories', as: 'wiiu_categories'});
      this.belongsToMany(models.Wii, {foreignKey: 'category_id', through: 'GamesCategories', as: 'wii_categories'});
      this.belongsToMany(models.GameCube, {foreignKey: 'category_id', through: 'GamesCategories', as: 'gamecube_categories'});
      this.belongsToMany(models.VirtualConsole, {foreignKey: 'category_id', through: 'GamesCategories', as: 'virtualconsole_categories'});
    }
  }
  Category.init({
    slugname: DataTypes.STRING,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Category',
    tableName: 'Category'
  });
  return Category;
};