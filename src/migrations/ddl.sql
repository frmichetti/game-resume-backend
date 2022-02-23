CREATE or REPLACE VIEW all_pc_games AS
SELECT app_id, title, finished, finished_at, 'PC' as platform, 'steam' as "system" FROM "Steam"
UNION
SELECT app_id, title, finished, finished_at, 'PC' as platform, 'origin' as "system" FROM "Origin"
UNION
SELECT app_id, title, finished, finished_at, 'PC' as platform, 'ubisoft' as "system" FROM "Ubisoft"

CREATE or REPLACE VIEW all_console_games AS
SELECT app_id, title, finished, finished_at, genuine, collection, fisical_disc, 'CONSOLE' as platform, 'gamecube' as "system" FROM "GameCube"
UNION
SELECT app_id, title, finished, finished_at, genuine, collection, fisical_disc, 'CONSOLE' as platform, 'wii' as "system" FROM "Wii"
UNION
SELECT app_id, title, finished, finished_at, genuine, collection, fisical_disc, 'CONSOLE' as platform, 'wiiu' as "system" FROM "WiiU"
UNION
SELECT app_id, title, finished, finished_at, genuine, false as collection, false as fisical_disc, 'CONSOLE' as platform, "system" as "system" FROM "VirtualConsole"

CREATE or REPLACE VIEW all_games AS
SELECT app_id, id, title, finished, finished_at, false AS collection, 'PC' AS platform, 'origin' AS "system" FROM "Origin"
UNION
SELECT app_id, id, title, finished, finished_at, false AS collection, 'PC' AS platform, 'ubisoft' AS "system" FROM "Ubisoft"
UNION
SELECT app_id, id, title, finished, finished_at, collection, 'PC' AS platform, 'steam' AS "system" FROM "Steam"
UNION
SELECT app_id, id, title, finished, finished_at, collection, 'CONSOLE' AS platform, 'gamecube' AS "system" FROM "GameCube"
UNION
SELECT app_id, id, title, finished, finished_at, collection, 'CONSOLE' AS platform, 'wii' AS "system" FROM "Wii"
UNION
SELECT app_id, id, title, finished, finished_at, collection, 'CONSOLE' AS platform, 'wiiu' AS "system" FROM "WiiU"
UNION SELECT app_id, id, title, finished, finished_at, false, platform, "system" FROM "VirtualConsole"

CREATE or REPLACE VIEW total_of_finished_games_by_system AS
SELECT "system", finished, Count(*) AS total
FROM all_games
GROUP BY all_games.system, finished
HAVING all_games.finished = true

CREATE or REPLACE VIEW total_of_finished_games_by_system_percentual AS
SELECT ag.system, ag.finished, (Count(ag.id::float)/tmp.cnt::float)::float * 100 AS percentual
FROM all_games ag, (SELECT COUNT(id) cnt FROM all_games) tmp
GROUP BY ag.system, ag.finished, tmp.cnt
HAVING ag.finished = true;

CREATE or REPLACE VIEW total_of_games_by_system AS
SELECT "system", Count(*) AS total
FROM all_games
GROUP BY all_games.system, finished

CREATE or REPLACE VIEW total_of_games_by_system_percentual AS
SELECT ag.system, (Count(ag.id::float)/tmp.cnt::float)::float * 100 AS percentual
FROM all_games ag, (SELECT COUNT(id) cnt FROM all_games) tmp
GROUP BY ag.system, tmp.cnt

