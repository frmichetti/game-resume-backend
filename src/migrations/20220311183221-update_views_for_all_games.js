'use strict';
const fs = require('fs');
const path = require('path');

const sql = fs.readFileSync(path.resolve(__dirname, 'update_views_for_all_games.sql'), 'utf8');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(sql);
  },

  async down (queryInterface, Sequelize) {
      
  }
};
