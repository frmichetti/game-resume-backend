'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const ddl = `
    create function which_system(appid varchar)
    returns varchar
    language plpgsql
    as
$$
    declare
       tablename varchar;
    begin
        SELECT (CASE
           WHEN exists(select 1 from "GameCube" where app_id = appid) THEN 'GameCube'
           WHEN exists(select 1 from "Wii" where app_id = appid) THEN 'Wii'
           WHEN exists(select 1 from "WiiU" where app_id = appid) THEN 'WiiU'
           WHEN exists(select 1 from "Origin" where app_id = appid) THEN 'Origin'
           WHEN exists(select 1 from "Ubisoft" where app_id = appid) THEN 'Ubisoft'
           WHEN exists(select 1 from "Steam" where app_id = appid) THEN 'Steam'
           ELSE 'Not Found'
       END) INTO tablename ;

          return tablename;
        end;
$$;`
    await queryInterface.sequelize.query(ddl);
  },

  async down(queryInterface, Sequelize) {
    const ddl = `drop function which_system(appid varchar);`
    await queryInterface.sequelize.query(ddl);
  }
};
