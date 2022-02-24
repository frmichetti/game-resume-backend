CREATE or REPLACE VIEW total_of_finished_games_by_system AS
SELECT "system", finished, Count(*) AS total
FROM all_games
GROUP BY all_games.system, finished
HAVING all_games.finished = true;

CREATE or REPLACE VIEW total_of_finished_games_by_system_percentual AS
SELECT ag.system, ag.finished, (Count(ag.id::float)/tmp.cnt::float)::float * 100 AS percentual
FROM all_games ag, (SELECT COUNT(id) cnt FROM all_games) tmp
GROUP BY ag.system, ag.finished, tmp.cnt
HAVING ag.finished = true;

CREATE or REPLACE VIEW total_of_games_by_system AS
SELECT "system", Count(*) AS total
FROM all_games
GROUP BY all_games.system, finished;

CREATE or REPLACE VIEW total_of_games_by_system_percentual AS
SELECT ag.system, (Count(ag.id::float)/tmp.cnt::float)::float * 100 AS percentual
FROM all_games ag, (SELECT COUNT(id) cnt FROM all_games) tmp
GROUP BY ag.system, tmp.cnt;

