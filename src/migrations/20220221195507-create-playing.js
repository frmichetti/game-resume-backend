const DataTypes = require('sequelize/lib/data-types');

'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Playing', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      app_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {          
          model: "Games",          
          key: 'app_id',              
          deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE          
        }              
      },
      started_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      finished: {
        type: Sequelize.BOOLEAN,        
        allowNull: false,
        defaultValue: false,
      },
      finished_at: {
        type: Sequelize.DATE
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: DataTypes.NOW
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: DataTypes.NOW
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Playing');
  }
};