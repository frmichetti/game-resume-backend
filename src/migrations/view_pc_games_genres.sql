CREATE OR REPLACE VIEW pc_games_genres AS
(SELECT GC.app_id, GC.title, GC.finished, GC.genuine, GC.collection, C.name AS genre FROM "Games" GC
                                                                                              INNER JOIN "GamesCategories" GCAT on GC.app_id = GCAT.app_id
                                                                                              INNER JOIN "System" S on S.id = GC.system_id
                                                                                              INNER JOIN "Category" C on C.id = GCAT.category_id
 WHERE S.system = 'Steam')
UNION
(SELECT GC.app_id, GC.title, GC.finished, GC.genuine, GC.collection, C.name AS genre FROM "Games" GC
                                                                                              INNER JOIN "GamesCategories" GCAT on GC.app_id = GCAT.app_id
                                                                                              INNER JOIN "System" S on S.id = GC.system_id
                                                                                              INNER JOIN "Category" C on C.id = GCAT.category_id
 WHERE S.system = 'Origin')
UNION
(SELECT GC.app_id, GC.title, GC.finished, GC.genuine, GC.collection, C.name AS genre FROM "Games" GC
                                                                                              INNER JOIN "GamesCategories" GCAT on GC.app_id = GCAT.app_id
                                                                                              INNER JOIN "System" S on S.id = GC.system_id
                                                                                              INNER JOIN "Category" C on C.id = GCAT.category_id
 WHERE S.system = 'Ubisoft');




