'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const ddl = `
    ALTER TABLE "CodeAndTip" ADD CONSTRAINT codetip_app_id_unique_constraint UNIQUE (app_id);
    CREATE TRIGGER set_timestamp
      BEFORE UPDATE ON "CodeAndTip"
        FOR EACH ROW
        EXECUTE PROCEDURE trigger_set_timestamp();
    `
    await queryInterface.sequelize.query(ddl);
  },

  async down(queryInterface, Sequelize) {
    const ddl = `
    
    `
    await queryInterface.sequelize.query(ddl);
  }
};
