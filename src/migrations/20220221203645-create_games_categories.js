const DataTypes = require('sequelize/lib/data-types');

'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('GamesCategories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      app_id: {
        type: Sequelize.STRING,
        allowNull: false
      },
      category_id: {
        type: Sequelize.INTEGER,
        references: { model: 'Category', key: 'id'}
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
    await queryInterface.dropTable('GamesCategories');
  }
};