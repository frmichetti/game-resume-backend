CREATE TABLE "Trash" (
    id SERIAL PRIMARY KEY,
    table_name varchar NOT NULL ,
    data jsonb not null,
    deleted_at timestamp default now() NOT NULL
);


CREATE OR REPLACE FUNCTION aft_delete()
  RETURNS trigger AS
$$
BEGIN
INSERT into "Trash"(id,table_name, data, deleted_at) VALUES (DEFAULT, TG_TABLE_NAME, to_json(OLD),now());
RETURN NEW;
END;

$$
LANGUAGE 'plpgsql';

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