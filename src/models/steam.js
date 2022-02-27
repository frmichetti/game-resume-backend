'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Steam extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.DLC, {foreignKey: 'app_id', sourceKey: 'app_id',  as: 'dlcs'});      
      this.belongsToMany(models.Category, {foreignKey: 'app_id', sourceKey: 'app_id',  through: 'GamesCategories', as: 'categories'});
    }
  }
  Steam.init({
    app_id: DataTypes.STRING,
    title: DataTypes.STRING,
    finished: DataTypes.BOOLEAN,
    finished_at: DataTypes.DATE,
    collection: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Steam',
    tableName: "Steam"
  });
  return Steam;
};