'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const ddl = `
    create view total_of_console_genres_composed AS
    SELECT gnr.genre, COUNT(gnr.app_id) AS TOTAL FROM
          (SELECT string_agg(genre, ' - ') AS genre, app_id FROM console_games_genres group by app_id) gnr
    GROUP BY gnr.genre;
    
    create view total_of_pc_genres_composed AS
    SELECT gnr.genre, COUNT(gnr.app_id) AS TOTAL FROM
          (SELECT string_agg(genre, ' - ') AS genre, app_id FROM pc_games_genres group by app_id) gnr
    GROUP BY gnr.genre;
    `
    await queryInterface.sequelize.query(ddl);
  },

  async down(queryInterface, Sequelize) {
    const ddl = `
    drop view total_of_pc_genres_composed;
    drop view total_of_console_genres_composed;`
    await queryInterface.sequelize.query(ddl);
  }
};
