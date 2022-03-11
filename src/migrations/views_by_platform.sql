CREATE or REPLACE VIEW all_pc_games AS
(SELECT id, app_id, system_id, title, finished, finished_at, genuine, collection, fisical_disc,
        which_platform(system_id) as platform, which_system(system_id) as "system"
 FROM "Games" WHERE which_platform(system_id) = 'PC' ORDER BY title);


CREATE or REPLACE VIEW all_console_games AS
(SELECT id, app_id, system_id, title, finished, finished_at, genuine, collection, fisical_disc,
        which_platform(system_id) as platform, which_system(system_id) as "system"
FROM "Games" WHERE which_platform(system_id) = 'Console' ORDER BY title)
UNION
(SELECT id, app_id, system_id, title, finished, finished_at, genuine, false as collection, false as fisical_disc,
       which_platform(system_id) as platform, which_system(system_id) as "system"
FROM "VirtualConsole");

CREATE or REPLACE VIEW all_games AS
(SELECT * from "all_pc_games")
UNION
(SELECT * from "all_console_games") ORDER BY title;


CREATE or REPLACE VIEW all_games_list_api AS
SELECT * FROM (SELECT * from all_games WHERE collection = false
               UNION
               SELECT "DLC".id,
                      "DLC".app_id,
                      G.system_id AS system_id,
                      "DLC".title,
                      "DLC".finished,
                      "DLC".finished_at,
                      G.genuine,
                      "DLC".collection,
                      G.fisical_disc,
                      which_platform(G.system_id) AS platform,
                      which_system(G.system_id) AS system
               FROM "DLC" inner join "Games" G on "DLC".app_id = G.app_id
               WHERE "DLC".collection = true) tmp ORDER BY title;