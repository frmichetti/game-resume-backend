'use strict';
const fs = require('fs');
const path = require('path');

const ddl = fs.readFileSync(path.resolve(__dirname, 'timestamps.sql'), 'utf8');

module.exports = {
  async up (queryInterface, Sequelize) {    
    await queryInterface.sequelize.query(ddl);
  },

  async down (queryInterface, Sequelize) {
    
  }
};
