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
           WHEN exists(select 1 from "Games" inner join "System" S on S.id = "Games".system_id where system = 'GameCube' AND app_id = appid) THEN 'GameCube'
           WHEN exists(select 1 from "Games" inner join "System" S on S.id = "Games".system_id where system = 'Wii' AND app_id = appid) THEN 'Wii'
           WHEN exists(select 1 from "Games" inner join "System" S on S.id = "Games".system_id where system = 'WiiU' AND app_id = appid) THEN 'WiiU'
           WHEN exists(select 1 from "Games" inner join "System" S on S.id = "Games".system_id where system = 'Origin' AND app_id = appid) THEN 'Origin'
           WHEN exists(select 1 from "Games" inner join "System" S on S.id = "Games".system_id where system = 'Ubisoft' AND app_id = appid) THEN 'Ubisoft'
           WHEN exists(select 1 from "Games" inner join "System" S on S.id = "Games".system_id where system = 'Steam' AND app_id = appid) THEN 'Steam'
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
