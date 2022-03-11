'use strict';
const fs = require('fs');
const path = require('path');

const sql = fs.readFileSync(path.resolve(__dirname, 'add_column_system_id_to_games_tables.sql'), 'utf8');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(sql);
  },

  async down (queryInterface, Sequelize) {
      
  }
};
