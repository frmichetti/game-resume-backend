'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class VirtualConsole extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Category, {foreignKey: 'category_id', through: 'GamesCategories', as: 'categories'});
    }
  }
  VirtualConsole.init({
    app_id: DataTypes.STRING,
    title: DataTypes.STRING,
    finished: DataTypes.BOOLEAN,
    finished_at: DataTypes.DATE,
    genuine: DataTypes.BOOLEAN,
    system_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'VirtualConsole',
    tableName: 'VirtualConsole'
  });
  return VirtualConsole;
};