'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CodeAndTip extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Game, {foreignKey: 'app_id'})
    }
  }
  CodeAndTip.init({
    app_id: DataTypes.STRING,
    content: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'CodeAndTip',
    tableName: 'CodeAndTip',
    underscored: true
  });
  return CodeAndTip;
};