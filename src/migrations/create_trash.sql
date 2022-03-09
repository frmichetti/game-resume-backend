CREATE TABLE "Trash" (
    id SERIAL PRIMARY KEY,
    table_name varchar NOT NULL ,
    data jsonb not null,
    deleted_at timestamp default now() NOT NULL
);

-- Trigger AFTER DELETE
CREATE OR REPLACE FUNCTION aft_delete()
  RETURNS trigger AS
$$
BEGIN
INSERT into "Trash"(id,table_name, data, deleted_at) VALUES (DEFAULT, TG_TABLE_NAME, to_json(OLD),now());
RETURN NEW;
END;

$$
LANGUAGE 'plpgsql';

-- Associate Trigger on Tables
CREATE TRIGGER delete_entity
  AFTER DELETE
  ON "Category"
  FOR EACH ROW
  EXECUTE PROCEDURE aft_delete();

  CREATE TRIGGER delete_entity
  AFTER DELETE
  ON "CodeAndTip"
  FOR EACH ROW
  EXECUTE PROCEDURE aft_delete();

CREATE TRIGGER delete_entity
  AFTER DELETE
  ON "DLC"
  FOR EACH ROW
  EXECUTE PROCEDURE aft_delete();

CREATE TRIGGER delete_entity
  AFTER DELETE
  ON "GameCube"
  FOR EACH ROW
  EXECUTE PROCEDURE aft_delete();  

CREATE TRIGGER delete_entity
  AFTER DELETE
  ON "Origin"
  FOR EACH ROW
  EXECUTE PROCEDURE aft_delete();  

CREATE TRIGGER delete_entity
  AFTER DELETE
  ON "Playing"
  FOR EACH ROW
  EXECUTE PROCEDURE aft_delete();    

CREATE TRIGGER delete_entity
  AFTER DELETE
  ON "Steam"
  FOR EACH ROW
  EXECUTE PROCEDURE aft_delete();  

CREATE TRIGGER delete_entity
  AFTER DELETE
  ON "ToBuy"
  FOR EACH ROW
  EXECUTE PROCEDURE aft_delete();      

  CREATE TRIGGER delete_entity
  AFTER DELETE
  ON "Ubisoft"
  FOR EACH ROW
  EXECUTE PROCEDURE aft_delete();      

  CREATE TRIGGER delete_entity
  AFTER DELETE
  ON "VirtualConsole"
  FOR EACH ROW
  EXECUTE PROCEDURE aft_delete();      

  CREATE TRIGGER delete_entity
  AFTER DELETE
  ON "Wii"
  FOR EACH ROW
  EXECUTE PROCEDURE aft_delete();      

  CREATE TRIGGER delete_entity
  AFTER DELETE
  ON "WiiU"
  FOR EACH ROW
  EXECUTE PROCEDURE aft_delete();      

-- Trash Views

-- Category
CREATE OR REPLACE VIEW category_trash AS
SELECT t.id AS trash_id, t.table_name AS table_name,  d.*
FROM   "Trash" t
     , jsonb_to_record(t.data)
         d(id int, slugname varchar, name varchar, created_at timestamp, updated_at timestamp)
WHERE table_name = 'Category';

-- CodeAntTip
CREATE OR REPLACE VIEW code_and_tip_trash AS
SELECT t.id AS trash_id, t.table_name AS table_name,  d.*
FROM   "Trash" t
     , jsonb_to_record(t.data)
         d(id int, app_id varchar, content TEXT, created_at timestamp, updated_at timestamp)
WHERE table_name = 'CodeAndTip';

-- DLC
CREATE OR REPLACE VIEW dlc_trash AS
SELECT t.id AS trash_id, t.table_name AS table_name,  d.*
FROM   "Trash" t
     , jsonb_to_record(t.data)
         d(id int, title varchar, app_id varchar, finished boolean, collection boolean, created_at timestamp, updated_at timestamp, finished_at timestamp)
WHERE table_name = 'DLC';

-- GameCube
CREATE OR REPLACE VIEW gamecube_trash AS
SELECT t.id AS trash_id, t.table_name AS table_name,  d.*
FROM   "Trash" t
     , jsonb_to_record(t.data)
         d(id int, app_id varchar, title varchar, finished boolean, finished_at timestamp, collection boolean, genuine boolean, fisical_disc boolean, created_at timestamp, updated_at timestamp)
WHERE table_name = 'GameCube';

-- Origin
CREATE OR REPLACE VIEW origin_trash AS
SELECT t.id AS trash_id, t.table_name AS table_name,  d.*
FROM   "Trash" t
     , jsonb_to_record(t.data)
         d(id int, app_id varchar, title varchar, finished boolean, finished_at timestamp, created_at timestamp, updated_at timestamp)
WHERE table_name = 'Origin';

-- Playing
CREATE OR REPLACE VIEW playing_trash AS
SELECT t.id AS trash_id, t.table_name AS table_name,  d.*
FROM   "Trash" t
     , jsonb_to_record(t.data)
         d(id int, app_id varchar, title varchar, started_At timestamp, finished boolean, finished_at timestamp, created_at timestamp, updated_at timestamp)
WHERE table_name = 'Playing';

-- Steam
CREATE OR REPLACE VIEW steam_trash AS
SELECT t.id AS trash_id, t.table_name AS table_name,  d.*
FROM   "Trash" t
     , jsonb_to_record(t.data)
         d(id int, app_id varchar, title varchar, finished boolean, finished_at timestamp, collection boolean, created_at timestamp, updated_at timestamp)
WHERE table_name = 'Steam';

-- ToBuy
CREATE OR REPLACE VIEW tobuy_trash AS
SELECT t.id AS trash_id, t.table_name AS table_name,  d.*
FROM   "Trash" t
     , jsonb_to_record(t.data)
         d(id int, title varchar, finished boolean, finished_at timestamp, system varchar, created_at timestamp, updated_at timestamp, magnetic_link TEXT)
WHERE table_name = 'ToBuy';

-- Ubisoft
CREATE OR REPLACE VIEW ubisoft_trash AS
SELECT t.id AS trash_id, t.table_name AS table_name,  d.*
FROM   "Trash" t
     , jsonb_to_record(t.data)
         d(id int, app_id varchar, title varchar, finished boolean, finished_at timestamp, created_at timestamp, updated_at timestamp)
WHERE table_name = 'Ubisoft';

-- VirtualConsole
CREATE OR REPLACE VIEW virtual_console_trash AS
SELECT t.id AS trash_id, t.table_name AS table_name,  d.*
FROM   "Trash" t
     , jsonb_to_record(t.data)
         d(id int, app_id varchar, title varchar, finished boolean, finished_at timestamp, genuine boolean, platform varchar, system varchar, created_at timestamp, updated_at timestamp)
WHERE table_name = 'VirtualConsole';

-- Wii
CREATE OR REPLACE VIEW wii_trash AS
SELECT t.id AS trash_id, t.table_name AS table_name,  d.*
FROM   "Trash" t
     , jsonb_to_record(t.data)
         d(id int, app_id varchar, title varchar, finished boolean, finished_at timestamp, collection boolean, genuine boolean, fisical_disc boolean, created_at timestamp, updated_at timestamp)
WHERE table_name = 'Wii';

-- WiiU
CREATE OR REPLACE VIEW wiiu_trash AS
SELECT t.id AS trash_id, t.table_name AS table_name,  d.*
FROM   "Trash" t
     , jsonb_to_record(t.data)
         d(id int, app_id varchar, title varchar, finished boolean, finished_at timestamp, collection boolean, genuine boolean, fisical_disc boolean, created_at timestamp, updated_at timestamp)
WHERE table_name = 'WiiU';

-- Function to Restore itens from "TRASH"
create function restore(t_id int) returns boolean
    language plpgsql
AS $$
declare
       cid int;
       ctable_name varchar;
       cdata jsonb;
    begin
        select id, table_name, data INTO cid, ctable_name, cdata from "Trash" where id = t_id;

        CASE
        WHEN ctable_name = 'Category' THEN
            insert into "Category" (id, slugname, name, created_at, updated_at) VALUES
                ((cdata->'id')::int,(cdata->>'slugname'), (cdata->>'name'),
                (cdata->>'created_at')::timestamp,
                (cdata->>'updated_at')::timestamp);
        WHEN ctable_name = 'CodeAndTip' THEN
            insert into "CodeAndTip" (id, app_id, content, created_at, updated_at) values
                ((cdata->'id')::int,(cdata->>'app_id'),(cdata->>'content'),
                (cdata->>'created_at')::timestamp,
                (cdata->>'updated_at')::timestamp);
        WHEN ctable_name = 'DLC' THEN
            insert into "DLC" (id, app_id, title, finished, finished_at, collection, created_at, updated_at) VALUES
                ((cdata->'id')::int, (cdata->>'app_id'), (cdata->>'title'), (cdata->'finished')::boolean,
                (cdata->>'finished_at')::timestamp, (cdata->'collection')::boolean,
                (cdata->>'created_at')::timestamp,
                (cdata->>'updated_at')::timestamp);
        WHEN ctable_name = 'GameCube' THEN
            insert into "GameCube" (id, app_id, title, finished, finished_at, collection, genuine, fisical_disc, created_at, updated_at) VALUES
                ((cdata->'id')::int, (cdata->>'app_id'), (cdata->>'title'), (cdata->'finished')::boolean,
                (cdata->>'finished_at')::timestamp, (cdata->'collection')::boolean, (cdata->'genuine')::boolean, (cdata->'fisical_disc')::boolean,
                (cdata->>'created_at')::timestamp,
                (cdata->>'updated_at')::timestamp);
        WHEN ctable_name = 'Origin' THEN
            insert into "Origin" (id, app_id, title, finished, finished_at, created_at, updated_at) VALUES
                ((cdata->'id')::int, (cdata->>'app_id'), (cdata->>'title'), (cdata->'finished')::boolean,
                (cdata->>'finished_at')::timestamp,
                (cdata->>'created_at')::timestamp,
                (cdata->>'updated_at')::timestamp);
        WHEN ctable_name = 'Playing' THEN
            insert into "Playing" (id, app_id, started_at, finished, finished_at, created_at, updated_at, title) VALUES
            ((cdata->'id')::int, (cdata->>'app_id'),(cdata->>'started_at')::timestamp,(cdata->'finished')::boolean,
             (cdata->>'finished_at')::timestamp,
             (cdata->>'created_at')::timestamp,
             (cdata->>'updated_at')::timestamp);
        WHEN ctable_name = 'Steam' THEN
            insert into "Steam" (id, app_id, title, finished, finished_at, collection, created_at, updated_at) VALUES
                ((cdata->'id')::int, (cdata->>'app_id'), (cdata->>'title'), (cdata->'finished')::boolean,
                (cdata->>'finished_at')::timestamp, (cdata->'collection')::boolean,
                (cdata->>'created_at')::timestamp,
                (cdata->>'updated_at')::timestamp);
        WHEN ctable_name = 'ToBuy' THEN
            insert into "ToBuy" (id, title, finished, finished_at, system, created_at, updated_at, magnetic_link) VALUES
            ((cdata->'id')::int, (cdata->>'title'), (cdata->'finished')::boolean, (cdata->>'finished_at')::timestamp,
             (cdata->>'system'),(cdata->>'created_at')::timestamp, (cdata->>'updated_at')::timestamp, (cdata->>'magnetic_link'));
        WHEN ctable_name = 'Ubisoft' THEN
            insert into "Ubisoft" (id, app_id, title, finished, finished_at, created_at, updated_at) VALUES
                ((cdata->'id')::int, (cdata->>'app_id'), (cdata->>'title'), (cdata->'finished')::boolean,
                (cdata->>'finished_at')::timestamp,
                (cdata->>'created_at')::timestamp,
                (cdata->>'updated_at')::timestamp);
        WHEN ctable_name = 'VirtualConsole' THEN
            insert into "VirtualConsole" (id, app_id, title, finished, finished_at, genuine, platform, system, created_at, updated_at) VALUES
            ((cdata->'id')::int, (cdata->>'app_id'), (cdata->>'title'), (cdata->'finished')::boolean,
             (cdata->>'finished_at')::timestamp, (cdata->'genuine')::boolean, (cdata->>'platform'), (cdata->>'system'),
             (cdata->>'created_at')::timestamp, (cdata->>'updated_at')::timestamp);
        WHEN ctable_name = 'Wii' THEN
            insert into "Wii" (id, app_id, title, finished, finished_at, collection, genuine, fisical_disc, created_at, updated_at) VALUES
                ((cdata->'id')::int, (cdata->>'app_id'), (cdata->>'title'), (cdata->'finished')::boolean,
                (cdata->>'finished_at')::timestamp, (cdata->'collection')::boolean, (cdata->'genuine')::boolean, (cdata->'fisical_disc')::boolean,
                (cdata->>'created_at')::timestamp,
                (cdata->>'updated_at')::timestamp);
        WHEN ctable_name = 'WiiU' THEN
            insert into "WiiU" (id, app_id, title, finished, finished_at, collection, genuine, fisical_disc, created_at, updated_at) VALUES
                ((cdata->'id')::int, (cdata->>'app_id'), (cdata->>'title'), (cdata->'finished')::boolean,
                (cdata->>'finished_at')::timestamp, (cdata->'collection')::boolean, (cdata->'genuine')::boolean, (cdata->'fisical_disc')::boolean,
                (cdata->>'created_at')::timestamp,
                (cdata->>'updated_at')::timestamp);
        END CASE;

        delete from "Trash" where id = t_id;

          return true;
        end;
$$;

