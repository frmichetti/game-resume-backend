'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.CodeAndTip)
      this.hasMany(modesl.Playing, {foreignKey: 'app_id', sourceKey: 'app_id',  as: 'playings'})
      this.belongsTo(models.System)
      this.hasMany(models.DLC, {foreignKey: 'app_id', sourceKey: 'app_id',  as: 'dlcs'});      
      this.belongsToMany(models.Category, {foreignKey: 'app_id', sourceKey: 'app_id',  through: 'GamesCategories', as: 'categories'});
    }
  }
  Game.init({
    app_id: DataTypes.STRING,
    system_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    finished: DataTypes.BOOLEAN,
    finished_at: DataTypes.DATE,
    collection: DataTypes.BOOLEAN,
    genuine: DataTypes.BOOLEAN,
    fisical_disc: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Game',
    tableName: 'Games',
    underscored: true
  });
  return Game;
};