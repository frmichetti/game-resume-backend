CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

alter table "Category" alter column created_at set default now();
alter table "Category" alter column updated_at set default now();

alter table "DLC" alter column created_at set default now();
alter table "DLC" alter column updated_at set default now();

alter table "Games" alter column created_at set default now();
alter table "Games" alter column updated_at set default now();

alter table "GamesCategories" alter column created_at set default now();
alter table "GamesCategories" alter column updated_at set default now();

alter table "Playing" alter column created_at set default now();
alter table "Playing" alter column updated_at set default now();


alter table "ToBuy" alter column created_at set default now();
alter table "ToBuy" alter column updated_at set default now();


alter table "VirtualConsole" alter column created_at set default now();
alter table "VirtualConsole" alter column updated_at set default now();

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON "Category"
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON "DLC"
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON "Games"
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON "GamesCategories"
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON "Playing"
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON "ToBuy"
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON "VirtualConsole"
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();
