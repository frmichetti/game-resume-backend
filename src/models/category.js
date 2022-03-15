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
      this.belongsToMany(models.Game, {foreignKey: 'category_id', otherKey: 'app_id', through: 'GamesCategories', as: 'games_categories'});        
    }
  }
  Category.init({
    slugname: DataTypes.STRING,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Category',
    tableName: 'Category',
    underscored: true
  });
  return Category;
};