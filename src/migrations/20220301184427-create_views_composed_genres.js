'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const ddl = ``
    await queryInterface.sequelize.query(ddl);
  },

  async down(queryInterface, Sequelize) {
    const ddl = ``
    await queryInterface.sequelize.query(ddl);
  }
};
