'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const ddl = `
    CREATE OR REPLACE VIEW total_of_finished_by_system_percentual_over_system AS
    SELECT ag.system, count(ag.id) AS total_of_games, gf.finished_cnt, (gf.finished_cnt::float / count(ag.id)::float) * 100 AS percentual
      FROM all_games ag INNER JOIN (SELECT all_games.system, count(all_games.id) AS finished_cnt
      FROM all_games WHERE finished = true GROUP BY all_games.system ORDER BY all_games.system ASC) gf ON ag.system = gf.system
      GROUP BY ag.system, gf.system, gf.finished_cnt ORDER BY gf.system ASC;

    `
    await queryInterface.sequelize.query(ddl);
  },

  async down(queryInterface, Sequelize) {
    const ddl = `
    DROP VIEW total_of_finished_by_system_percentual_over_system;
    `
    await queryInterface.sequelize.query(ddl);
  }
};
