create OR REPLACE view total_of_sum_of_console_games_percentual(total) as
SELECT sum(count_console.percentual) AS total
FROM (SELECT all_games.platform,
             all_games.system,
             count(all_games.id::double precision)::double precision / tmp.cnt::double precision *
             100::double precision AS percentual
      FROM all_games,
           (SELECT count(all_games_1.id) AS cnt
            FROM all_games all_games_1) tmp
      GROUP BY all_games.platform, all_games.system, tmp.cnt
      HAVING all_games.platform = 'Console'::text) count_console;

create OR REPLACE view total_of_sum_of_console_games_percentual_finished(total) as
SELECT sum(agcount.percentual) AS total
FROM (SELECT all_games.platform,
             all_games.system,
             all_games.finished,
             count(all_games.id::double precision)::double precision / tmp.cnt::double precision *
             100::double precision AS percentual
      FROM all_games,
           (SELECT count(all_games_1.id) AS cnt
            FROM all_games all_games_1) tmp
      GROUP BY all_games.platform, all_games.system, all_games.finished, tmp.cnt
      HAVING all_games.platform = 'Console'::text
         AND all_games.finished = true) agcount;

create OR REPLACE view total_of_console_games(total) as
SELECT count(all_games.platform) AS total
FROM all_games
WHERE all_games.platform = 'Console'::text;

create OR REPLACE view total_of_console_games_finished(total) as
SELECT count(all_games.platform) AS total
FROM all_games
WHERE all_games.platform = 'Console'::text
  AND all_games.finished = true;


