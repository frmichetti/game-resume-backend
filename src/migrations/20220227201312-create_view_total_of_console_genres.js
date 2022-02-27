'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const ddl = `CREATE OR REPLACE VIEW total_of_console_genres AS
    SELECT genre, COUNT(genre) AS total FROM console_games_genres GROUP BY genre;
    `
    await queryInterface.sequelize.query(ddl);
  },

  async down(queryInterface, Sequelize) {
    const ddl = `DROP VIEW total_of_console_genres;`
    await queryInterface.sequelize.query(ddl);
  }
};
