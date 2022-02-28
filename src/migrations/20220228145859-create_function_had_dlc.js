'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const ddl = `create function has_dlc(appid varchar)
                    returns boolean
                    language plpgsql
                    as
                    $$
                    declare
                      cnt integer;
                      row_exists Boolean;
                    begin
                      row_exists := false;
                    
                      select count(*) INTO cnt from "DLC" where app_id=appid;
                    
                      IF cnt > 0 THEN
                        row_exists := true;
                      END IF;
                    
                      return row_exists;
                    end;
                    $$;`
    await queryInterface.sequelize.query(ddl);
  },

  async down(queryInterface, Sequelize) {
    const ddl = `drop function has_dlc(appid varchar);`
    await queryInterface.sequelize.query(ddl);
  }
};
