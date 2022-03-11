-- Category Constraints

ALTER TABLE "Category"
ADD CONSTRAINT name_slug_constraint UNIQUE (slugname,name);

ALTER TABLE "Category"
ALTER COLUMN name SET NOT NULL;

ALTER TABLE "Category"
ALTER COLUMN slugname SET NOT NULL;

--DLC Constraints
ALTER TABLE "DLC"
ADD CONSTRAINT dlc_title_constraint UNIQUE (app_id, title);

ALTER TABLE "DLC"
ALTER COLUMN app_id SET NOT NULL;

ALTER TABLE "DLC"
ALTER COLUMN title SET NOT NULL;

ALTER TABLE "DLC"
ALTER COLUMN finished SET NOT NULL;

ALTER TABLE "DLC"
ALTER COLUMN collection SET NOT NULL;

alter table "DLC" alter column finished set default false;
alter table "DLC" alter column collection set default false;

-- VirtualConsole Constraints
ALTER TABLE "VirtualConsole"
ADD CONSTRAINT vc_title_constraint UNIQUE (app_id, title);

ALTER TABLE "VirtualConsole"
ALTER COLUMN title SET NOT NULL;

ALTER TABLE "VirtualConsole"
ALTER COLUMN finished SET NOT NULL;

ALTER TABLE "VirtualConsole"
ALTER COLUMN genuine SET NOT NULL;

alter table "VirtualConsole" alter column finished set default false;
alter table "VirtualConsole" alter column genuine set default false;