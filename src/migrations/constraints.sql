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

--GameCube Constraints
ALTER TABLE "GameCube"
ADD CONSTRAINT gamecube_title_constraint UNIQUE (app_id, title);

ALTER TABLE "GameCube"
ALTER COLUMN app_id SET NOT NULL;

ALTER TABLE "GameCube"
ALTER COLUMN title SET NOT NULL;

ALTER TABLE "GameCube"
ALTER COLUMN finished SET NOT NULL;

ALTER TABLE "GameCube"
ALTER COLUMN collection SET NOT NULL;

ALTER TABLE "GameCube"
ALTER COLUMN genuine SET NOT NULL;

ALTER TABLE "GameCube"
ALTER COLUMN fisical_disc SET NOT NULL;

alter table "GameCube" alter column finished set default false;
alter table "GameCube" alter column collection set default false;
alter table "GameCube" alter column genuine set default false;
alter table "GameCube" alter column fisical_disc set default false;

-- Wii Constraints
ALTER TABLE "Wii"
ADD CONSTRAINT wii_title_constraint UNIQUE (app_id, title);

ALTER TABLE "Wii"
ALTER COLUMN app_id SET NOT NULL;

ALTER TABLE "Wii"
ALTER COLUMN title SET NOT NULL;

ALTER TABLE "Wii"
ALTER COLUMN finished SET NOT NULL;

ALTER TABLE "Wii"
ALTER COLUMN collection SET NOT NULL;

ALTER TABLE "Wii"
ALTER COLUMN genuine SET NOT NULL;

ALTER TABLE "Wii"
ALTER COLUMN fisical_disc SET NOT NULL;

alter table "Wii" alter column finished set default false;
alter table "Wii" alter column collection set default false;
alter table "Wii" alter column genuine set default false;
alter table "Wii" alter column fisical_disc set default false;

-- WiiU Constraints
ALTER TABLE "WiiU"
ADD CONSTRAINT wiiu_title_constraint UNIQUE (app_id, title);

ALTER TABLE "WiiU"
ALTER COLUMN app_id SET NOT NULL;

ALTER TABLE "WiiU"
ALTER COLUMN title SET NOT NULL;

ALTER TABLE "WiiU"
ALTER COLUMN finished SET NOT NULL;

ALTER TABLE "WiiU"
ALTER COLUMN collection SET NOT NULL;

ALTER TABLE "WiiU"
ALTER COLUMN genuine SET NOT NULL;

ALTER TABLE "WiiU"
ALTER COLUMN fisical_disc SET NOT NULL;

alter table "WiiU" alter column finished set default false;
alter table "WiiU" alter column collection set default false;
alter table "WiiU" alter column genuine set default false;
alter table "WiiU" alter column fisical_disc set default false;

-- VirtualConsole Constraints
ALTER TABLE "VirtualConsole"
ADD CONSTRAINT vc_title_constraint UNIQUE (app_id, title);

ALTER TABLE "VirtualConsole"
ALTER COLUMN title SET NOT NULL;

ALTER TABLE "VirtualConsole"
ALTER COLUMN finished SET NOT NULL;

ALTER TABLE "VirtualConsole"
ALTER COLUMN genuine SET NOT NULL;

ALTER TABLE "VirtualConsole"
ALTER COLUMN platform SET NOT NULL;

ALTER TABLE "VirtualConsole"
ALTER COLUMN system SET NOT NULL;

alter table "VirtualConsole" alter column finished set default false;
alter table "VirtualConsole" alter column genuine set default false;

-- Origin Constraints
ALTER TABLE "Origin"
ADD CONSTRAINT origin_title_constraint UNIQUE (title);

ALTER TABLE "Origin"
ALTER COLUMN title SET NOT NULL;

ALTER TABLE "Origin"
ALTER COLUMN finished SET NOT NULL;

alter table "Origin" alter column finished set default false;

-- Steam Constraints
ALTER TABLE "Steam"
ADD CONSTRAINT steam_title_constraint UNIQUE (app_id, title);

ALTER TABLE "Steam"
ALTER COLUMN title SET NOT NULL;

ALTER TABLE "Steam"
ALTER COLUMN finished SET NOT NULL;

ALTER TABLE "Steam"
ALTER COLUMN collection SET NOT NULL;

alter table "Steam" alter column finished set default false;
alter table "Steam" alter column collection set default false;

-- Ubisoft Constraints
ALTER TABLE "Ubisoft"
ADD CONSTRAINT ubisoft_title_constraint UNIQUE (title);

ALTER TABLE "Ubisoft"
ALTER COLUMN title SET NOT NULL;

ALTER TABLE "Ubisoft"
ALTER COLUMN finished SET NOT NULL;

alter table "Ubisoft" alter column finished set default false;


