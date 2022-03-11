'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const ddl = `      
create or replace function which_platform(system_id int)
returns TEXT
language plpgsql
as
$$
declare
   r_platform TEXT;
begin
    select platform from "System" where id = system_id INTO r_platform ;

      return r_platform;
    end;
$$;


create or replace function which_system(system_id int)
returns TEXT
language plpgsql
as
$$
declare
   r_system TEXT;
begin
    select system from "System" where id = system_id INTO r_system ;

      return r_system;
    end;
$$;
    `
    await queryInterface.sequelize.query(ddl);
  },

  async down(queryInterface, Sequelize) {
    const ddl = `
    DROP function which_platform(system_id int);    
    DROP function which_system(system_id int);
    `
    await queryInterface.sequelize.query(ddl);
  }
};
