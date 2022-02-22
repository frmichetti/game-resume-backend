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