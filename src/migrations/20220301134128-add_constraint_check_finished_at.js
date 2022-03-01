'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const ddl = `
    ALTER TABLE "Origin" ADD CONSTRAINT check_origin_finished
    CHECK ((finished = false AND finished_at is null) OR (finished = true AND finished_at is not null));

    ALTER TABLE "Ubisoft" ADD CONSTRAINT check_ubisoft_finished
    CHECK ((finished = false AND finished_at is null) OR (finished = true AND finished_at is not null));

    ALTER TABLE "Steam" ADD CONSTRAINT check_steam_finished
    CHECK ((finished = false AND finished_at is null) OR (finished = true AND finished_at is not null));

    ALTER TABLE "GameCube" ADD CONSTRAINT check_gamecube_finished
    CHECK ((finished = false AND finished_at is null) OR (finished = true AND finished_at is not null));

    ALTER TABLE "Wii" ADD CONSTRAINT check_wii_finished
    CHECK ((finished = false AND finished_at is null) OR (finished = true AND finished_at is not null));

    ALTER TABLE "WiiU" ADD CONSTRAINT check_wiiu_finished
    CHECK ((finished = false AND finished_at is null) OR (finished = true AND finished_at is not null));

    ALTER TABLE "VirtualConsole" ADD CONSTRAINT check_vc_finished
    CHECK ((finished = false AND finished_at is null) OR (finished = true AND finished_at is not null));
    `
    await queryInterface.sequelize.query(ddl);
  },

  async down(queryInterface, Sequelize) {
    const ddl = ``
    await queryInterface.sequelize.query(ddl);
  }
};
