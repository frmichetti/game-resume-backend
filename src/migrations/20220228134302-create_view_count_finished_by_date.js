'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const ddl = `CREATE OR REPLACE VIEW count_finished_by_date AS
    SELECT DATE_TRUNC('month',ag.finished_at)::date AS month, COUNT(ag.title) AS total
      FROM all_games ag GROUP BY DATE_TRUNC('month',ag.finished_at)::date;
    `
    await queryInterface.sequelize.query(ddl);
  },

  async down(queryInterface, Sequelize) {
    const ddl = `DROP VIEW count_finished_by_date;`
    await queryInterface.sequelize.query(ddl);
  }
};
