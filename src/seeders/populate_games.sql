CREATE OR REPLACE VIEW copy_all_data AS
(SELECT app_id, system_id, title, finished, finished_at, false AS collection, true AS genuine, false AS fisical_disc, created_at, updated_at
FROM "Origin" ORDER BY id)
UNION
(SELECT app_id, system_id, title, finished, finished_at, collection, true AS genuine, false AS fisical_disc, created_at, updated_at
FROM "Steam" ORDER BY id)
UNION
(SELECT app_id, system_id, title, finished, finished_at, false AS collection, true AS genuine, false AS fisical_disc, created_at, updated_at
FROM "Ubisoft" ORDER BY id)
UNION
(SELECT app_id, system_id, title, finished, finished_at, collection, genuine, fisical_disc, created_at, updated_at
FROM "GameCube" ORDER BY id)
UNION
(SELECT app_id, system_id, title, finished, finished_at, collection, genuine, fisical_disc, created_at, updated_at
FROM "Wii" ORDER BY id)
UNION
(SELECT app_id, system_id, title, finished, finished_at, collection, genuine, fisical_disc, created_at, updated_at
FROM "WiiU" ORDER BY id) ORDER BY system_id;

INSERT INTO "Games"(app_id, system_id, title, finished, finished_at, collection, genuine, fisical_disc, created_at, updated_at)
    SELECT * FROM "copy_all_data";

DROP VIEW "copy_all_data";