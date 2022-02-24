CREATE or REPLACE VIEW total_of_console_games AS
SELECT COUNT(platform) AS total
FROM all_games
WHERE platform = 'CONSOLE';

CREATE OR REPLACE VIEW total_of_pc_games AS
SELECT COUNT(platform) AS total
FROM all_games
WHERE platform = 'PC';


CREATE or REPLACE VIEW total_of_duplicated_games AS
SELECT title, COUNT(title) AS total
FROM all_games
GROUP BY title
HAVING COUNT(title) > 1;

CREATE or REPLACE VIEW total_of_finished_games AS
SELECT COUNT(finished) AS total
FROM all_games
WHERE finished = true;

CREATE OR REPLACE VIEW total_of_unfinished_games AS
SELECT COUNT(finished) AS total
FROM all_games
WHERE finished = false;

CREATE or REPLACE VIEW total_of_finished_games_by_system AS
SELECT system, finished, Count(*) AS total
FROM all_games
GROUP BY all_games.system, finished
HAVING all_games.finished = true;

CREATE or REPLACE VIEW total_of_finished_games_by_system_percentual AS
SELECT all_games.system, all_games.finished, (Count(all_games.id::float) / tmp.cnt::float) * 100 AS percentual
FROM all_games, (SELECT COUNT(id) AS cnt FROM all_games)  AS tmp
GROUP BY all_games.system, all_games.finished, tmp.cnt
HAVING all_games.finished = true;

CREATE or REPLACE VIEW total_of_games_by_system AS
SELECT system, Count(*) AS total
FROM all_games
GROUP BY all_games.system;

CREATE or REPLACE VIEW total_of_games_by_system_percentual AS
SELECT all_games.system, (Count(all_games.id::float) / tmp.cnt::float) * 100 AS percentual
FROM all_games, (SELECT COUNT(id) AS cnt FROM all_games)  AS tmp
GROUP BY all_games.system, tmp.cnt;

CREATE OR REPLACE VIEW total_of_genuine_games AS
SELECT COUNT(genuine) AS total
FROM all_games
WHERE genuine = true;

CREATE OR REPLACE VIEW total_of_illicit_games AS
SELECT COUNT(genuine) AS total
FROM all_games
WHERE genuine = false;

CREATE OR REPLACE VIEW total_of_sum_of_console_games_percentual AS
SELECT SUM(percentual) AS total
FROM (SELECT all_games.platform, all_games.system, (Count(all_games.id::float) / tmp.cnt::float) * 100 AS percentual
FROM all_games, (SELECT COUNT(id) AS cnt FROM all_games) AS tmp
GROUP BY all_games.platform, all_games.system, tmp.cnt HAVING all_games.platform = 'CONSOLE') AS count_console;

CREATE OR REPLACE VIEW total_of_sum_of_pc_games_percentual AS
SELECT SUM(percentual) AS total
FROM (SELECT all_games.platform, all_games.system, (Count(all_games.id::float) / tmp.cnt::float) * 100 AS percentual
FROM all_games, (SELECT COUNT(id) AS cnt FROM all_games) AS tmp
GROUP BY all_games.platform, all_games.system, tmp.cnt HAVING all_games.platform = 'PC')  AS count_pc;

CREATE OR REPLACE VIEW total_games_for_dashboard AS
SELECT 'Total of PC Games' AS description, total FROM total_of_pc_games
UNION
SELECT 'Total of Console Games' AS description, total FROM total_of_console_games
UNION
SELECT 'Total of Genuine Games' AS description, total FROM total_of_genuine_games
UNION 
SELECT 'Total of Illicit Games' AS description, total FROM total_of_illicit_games
UNION
SELECT 'Total of Sum of Console Games Percentual' AS description, total FROM total_of_sum_of_console_games_percentual
UNION 
SELECT 'Total of Sum of PC Games Percentual' AS description, total FROM total_of_sum_of_pc_games_percentual;








