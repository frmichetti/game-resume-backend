'use strict';
const fs = require('fs');
const path = require('path');

const ddl = fs.readFileSync(path.resolve(__dirname, 'fix_total_of_sum_of_console_view.sql'), 'utf8');

module.exports = {
  async up (queryInterface, Sequelize) {    
    await queryInterface.sequelize.query(ddl);
  },

  async down (queryInterface, Sequelize) {
    
  }
};
