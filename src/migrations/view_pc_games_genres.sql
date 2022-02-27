CREATE OR REPLACE VIEW pc_games_genres AS
SELECT GC.app_id, GC.title, GC.finished, true AS genuine, GC.collection, C.name AS genre FROM "Steam" GC INNER JOIN "GamesCategories" GCAT on GC.app_id = GCAT.app_id
    INNER JOIN "Category" C on C.id = GCAT.category_id
UNION
SELECT GC.app_id, GC.title, GC.finished, true AS genuine, false AS collection, C.name AS genre FROM "Origin" GC INNER JOIN "GamesCategories" GCAT on GC.app_id = GCAT.app_id
    INNER JOIN "Category" C on C.id = GCAT.category_id
UNION
SELECT GC.app_id, GC.title, GC.finished, true AS genuine, false AS collection, C.name AS genre FROM "Ubisoft" GC INNER JOIN "GamesCategories" GCAT on GC.app_id = GCAT.app_id
    INNER JOIN "Category" C on C.id = GCAT.category_id;
