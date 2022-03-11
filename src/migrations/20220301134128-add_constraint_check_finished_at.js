'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const ddl = `
    ALTER TABLE "Games" ADD CONSTRAINT check_games_finished
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
