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