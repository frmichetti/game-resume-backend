'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const ddl = `
    CREATE OR REPLACE VIEW console_games_genres_aggregate AS
    SELECT  app_id, title, string_agg(genre, ' - ' order by genre) AS genre FROM console_games_genres group by app_id, title ORDER BY title;

    CREATE OR REPLACE VIEW pc_games_genres_aggregate AS
    SELECT  app_id, title, string_agg(genre, ' - ' order by genre) AS genre FROM pc_games_genres group by app_id, title ORDER BY title;

    CREATE OR REPLACE VIEW all_games_genres_aggregate AS
    SELECT * FROM console_games_genres_aggregate
    UNION
    SELECT * FROM pc_games_genres_aggregate;
    `
    await queryInterface.sequelize.query(ddl);
  },

  async down(queryInterface, Sequelize) {
    const ddl = `
    DROP VIEW all_games_genres_aggregate;
    DROP VIEW console_games_genres_aggregate;
    DROP VIEW pc_games_genres_aggregate;
    `
    await queryInterface.sequelize.query(ddl);
  }
};
