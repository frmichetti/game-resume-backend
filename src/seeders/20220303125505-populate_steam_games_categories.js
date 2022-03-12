'use strict';
const fs = require('fs');
const path = require('path');

const sql = fs.readFileSync(path.resolve(__dirname, 'SteamGamesCategories.sql'), 'utf8');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(sql);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('GamesCategories', null, {});    
  }
};
