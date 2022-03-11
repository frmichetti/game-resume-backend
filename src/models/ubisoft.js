'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ubisoft extends Model {
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
  Ubisoft.init({
    app_id: DataTypes.STRING,
    title: DataTypes.STRING,
    finished: DataTypes.BOOLEAN,
    finished_at: DataTypes.DATE,
    system_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Ubisoft',
    tableName: 'Ubisoft'
  });
  return Ubisoft;
};