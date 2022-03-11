'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const ddl = `
    CREATE OR REPLACE VIEW all_origin_games AS
    SELECT g.*, which_system(g.system_id) as system, which_platform(g.system_id) AS platform FROM "Games" g WHERE which_system(g.system_id) = 'Origin' ORDER BY title;

    CREATE OR REPLACE VIEW all_ubisoft_games AS
    SELECT g.*, which_system(g.system_id) as system, which_platform(g.system_id) AS platform FROM "Games" g WHERE which_system(g.system_id) = 'Ubisoft' ORDER BY title;

    CREATE OR REPLACE VIEW all_steam_games AS
    SELECT g.*, which_system(g.system_id) as system, which_platform(g.system_id) AS platform FROM "Games" g WHERE which_system(g.system_id) = 'Steam' ORDER BY title;

    CREATE OR REPLACE VIEW all_gamecube_games AS
    SELECT g.*, which_system(g.system_id) as system, which_platform(g.system_id) AS platform FROM "Games" g WHERE which_system(g.system_id) = 'GameCube' ORDER BY title;

    CREATE OR REPLACE VIEW all_wii_games AS
    SELECT g.*, which_system(g.system_id) as system, which_platform(g.system_id) AS platform FROM "Games" g WHERE which_system(g.system_id) = 'Wii' ORDER BY title;

    CREATE OR REPLACE VIEW all_wiiu_games AS
    SELECT g.*, which_system(g.system_id) as system, which_platform(g.system_id) AS platform FROM "Games" g WHERE which_system(g.system_id) = 'WiiU' ORDER BY title;
    `
    await queryInterface.sequelize.query(ddl);
  },

  async down(queryInterface, Sequelize) {
    const ddl = `
    DROP VIEW all_origin_games;
    DROP VIEW all_ubisoft_games;
    DROP VIEW all_steam_games;
    DROP VIEW all_gamecube_games;
    DROP VIEW all_wii_games;
    DROP VIEW all_wiiu_games;
    `
    await queryInterface.sequelize.query(ddl);
  }
};
