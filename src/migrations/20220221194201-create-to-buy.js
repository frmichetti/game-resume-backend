const DataTypes = require('sequelize/lib/data-types');

'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ToBuy', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      finished: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      finished_at: {
        type: Sequelize.DATE
      },
      genuine: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      system: {
        type: Sequelize.STRING,
        allowNull: false
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
    await queryInterface.dropTable('ToBuy');
  }
};