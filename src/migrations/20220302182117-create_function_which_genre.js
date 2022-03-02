'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const ddl = `
    create function which_genre(appid varchar)
    returns varchar
    language plpgsql
    as
$$
    declare
       r_genre varchar;
    begin
        select genre from all_games_genres_aggregate where app_id = appid INTO r_genre ;

          return r_genre;
        end;
$$;
    `
    await queryInterface.sequelize.query(ddl);
  },

  async down(queryInterface, Sequelize) {
    const ddl = `drop function which_genre(appid varchar);`
    await queryInterface.sequelize.query(ddl);
  }
};
