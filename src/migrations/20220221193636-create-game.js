const DataTypes = require('sequelize/lib/data-types');


'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Games', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      app_id: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true
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
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      finished: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      finished_at: {
        type: Sequelize.DATE,
        allowNull: true
      },
      collection: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      genuine: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      fisical_disc: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
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
    await queryInterface.dropTable('Games');
  }
};