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
    }
  }
  VirtualConsole.init({
    app_id: DataTypes.STRING,
    title: DataTypes.STRING,
    finished: DataTypes.BOOLEAN,
    finished_at: DataTypes.DATE,
    genuine: DataTypes.BOOLEAN,
    platform: DataTypes.STRING,
    system: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'VirtualConsole',
    tableName: 'VirtualConsole'
  });
  return VirtualConsole;
};