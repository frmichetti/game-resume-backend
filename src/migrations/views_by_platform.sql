CREATE or REPLACE VIEW all_pc_games AS
SELECT app_id, title, finished, finished_at, 'PC' as platform, 'STEAM' as "system" FROM "Steam"
UNION
SELECT app_id, title, finished, finished_at, 'PC' as platform, 'ORIGIN' as "system" FROM "Origin"
UNION
SELECT app_id, title, finished, finished_at, 'PC' as platform, 'UBISOFT' as "system" FROM "Ubisoft";

CREATE or REPLACE VIEW all_console_games AS
SELECT app_id, title, finished, finished_at, genuine, collection, fisical_disc, 'CONSOLE' as platform, 'GAMECUBE' as "system" FROM "GameCube"
UNION
SELECT app_id, title, finished, finished_at, genuine, collection, fisical_disc, 'CONSOLE' as platform, 'WII' as "system" FROM "Wii"
UNION
SELECT app_id, title, finished, finished_at, genuine, collection, fisical_disc, 'CONSOLE' as platform, 'WIIU' as "system" FROM "WiiU"
UNION
SELECT app_id, title, finished, finished_at, genuine, false as collection, false as fisical_disc, 'CONSOLE' as platform, "system" as "system" FROM "VirtualConsole";

CREATE or REPLACE VIEW all_games AS
SELECT app_id, id, title, finished, finished_at, false AS collection, 'PC' AS platform, 'ORIGIN' AS "system", true AS "genuine" FROM "Origin"
UNION
SELECT app_id, id, title, finished, finished_at, false AS collection, 'PC' AS platform, 'UBISOFT' AS "system", true AS "genuine" FROM "Ubisoft"
UNION
SELECT app_id, id, title, finished, finished_at, collection, 'PC' AS platform, 'STEAM' AS "system", true AS "genuine" FROM "Steam"
UNION
SELECT app_id, id, title, finished, finished_at, collection, 'CONSOLE' AS platform, 'GAMECUBE' AS "system", genuine FROM "GameCube"
UNION
SELECT app_id, id, title, finished, finished_at, collection, 'CONSOLE' AS platform, 'WII' AS "system", genuine FROM "Wii"
UNION
SELECT app_id, id, title, finished, finished_at, collection, 'CONSOLE' AS platform, 'WIIU' AS "system", genuine FROM "WiiU"
UNION 
SELECT app_id, id, title, finished, finished_at, false, platform, "system", genuine FROM "VirtualConsole";

CREATE or REPLACE VIEW all_games_list_api AS
SELECT "Origin".app_id,
       "Origin".id,
       "Origin".title,
       "Origin".finished,
       "Origin".finished_at,
       false          AS collection,
       'PC'::text     AS platform,
       'ORIGIN'::text AS system,
       true           AS genuine
FROM "Origin"
UNION
SELECT "Ubisoft".app_id,
       "Ubisoft".id,
       "Ubisoft".title,
       "Ubisoft".finished,
       "Ubisoft".finished_at,
       false           AS collection,
       'PC'::text      AS platform,
       'UBISOFT'::text AS system,
       true            AS genuine
FROM "Ubisoft"
UNION
SELECT "Steam".app_id,
       "Steam".id,
       "Steam".title,
       "Steam".finished,
       "Steam".finished_at,
       "Steam".collection,
       'PC'::text    AS platform,
       'STEAM'::text AS system,
       true          AS genuine
FROM "Steam" WHERE collection = false
UNION
SELECT "GameCube".app_id,
       "GameCube".id,
       "GameCube".title,
       "GameCube".finished,
       "GameCube".finished_at,
       "GameCube".collection,
       'CONSOLE'::text  AS platform,
       'GAMECUBE'::text AS system,
       "GameCube".genuine
FROM "GameCube" WHERE collection = false
UNION
SELECT "Wii".app_id,
       "Wii".id,
       "Wii".title,
       "Wii".finished,
       "Wii".finished_at,
       "Wii".collection,
       'CONSOLE'::text AS platform,
       'WII'::text     AS system,
       "Wii".genuine
FROM "Wii" WHERE collection = false
UNION
SELECT "WiiU".app_id,
       "WiiU".id,
       "WiiU".title,
       "WiiU".finished,
       "WiiU".finished_at,
       "WiiU".collection,
       'CONSOLE'::text AS platform,
       'WIIU'::text    AS system,
       "WiiU".genuine
FROM "WiiU" WHERE collection = false
UNION
SELECT "VirtualConsole".app_id,
       "VirtualConsole".id,
       "VirtualConsole".title,
       "VirtualConsole".finished,
       "VirtualConsole".finished_at,
       false AS collection,
       "VirtualConsole".platform,
       "VirtualConsole".system,
       "VirtualConsole".genuine
FROM "VirtualConsole"
UNION
SELECT "DLC".app_id,
       "DLC".id,
       "DLC".title,
       "DLC".finished,
       "DLC".finished_at,
       "DLC".collection,
       '-'::text     AS platform,
       '-'::text     AS system,
       NULL::boolean AS genuine
FROM "DLC" WHERE collection = true ORDER BY title