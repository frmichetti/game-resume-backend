const DataTypes = require('sequelize/lib/data-types');

'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('VirtualConsole', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      app_id: {
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.STRING
      },
      finished: {
        type: Sequelize.BOOLEAN
      },
      finished_at: {
        type: Sequelize.DATE
      },
      genuine: {
        type: Sequelize.BOOLEAN
      },
      system_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {          
          model: "System",          
          key: 'id',              
          deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE          
        }
      },      
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('VirtualConsole');
  }
};