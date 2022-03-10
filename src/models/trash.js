'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Trash extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Trash.init({
    table_name: DataTypes.STRING,
    data: DataTypes.JSONB,
    deleted_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Trash',
    tableName: 'Trash',
    timestamps: false
  });
  return Trash;
};