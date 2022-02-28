'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const sql = `UPDATE "Steam" set finished_at = '2021-06-01 00:00:00.0 +00:00' where finished = true AND finished_at is null;
    UPDATE "Origin" set finished_at = '2021-06-01 00:00:00.0 +00:00' where finished = true AND finished_at is null;
    UPDATE "Ubisoft" set finished_at = '2021-06-01 00:00:00.0 +00:00' where finished = true AND finished_at is null;
    UPDATE "GameCube" set finished_at = '2021-06-01 00:00:00.0 +00:00' where finished = true AND finished_at is null;
    UPDATE "Wii" set finished_at = '2021-06-01 00:00:00.0 +00:00' where finished = true AND finished_at is null;
    UPDATE "WiiU" set finished_at = '2021-06-01 00:00:00.0 +00:00' where finished = true AND finished_at is null;
    UPDATE "VirtualConsole" set finished_at = '2021-06-01 00:00:00.0 +00:00' where finished = true AND finished_at is null;
    `
    await queryInterface.sequelize.query(sql);
  },

  async down(queryInterface, Sequelize) {
    
  }
};
