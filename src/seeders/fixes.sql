-- fixes
DELETE FROM "WiiU" WHERE app_id = 'SF8E01';
DELETE FROM "VirtualConsole" where id in (1,2);
INSERT INTO "ToBuy" (title,finished,system,magnetic_link) VALUES ('Mortal Kombat 11',true,'PC','magnet:?xt=urn:btih:8D0128EF71651E6CE3B7C99F4D4FDF77B76EBFBD&dn=Mortal+Kombat+11+Premium+Edition+%282019%29+RePack+Xatab&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.dler.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fopentracker.i2p.rocks%3A6969%2Fannounce&tr=udp%3A%2F%2F47.ip-51-68-199.eu%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337%2Fannounce&tr=udp%3A%2F%2F9.rarbg.to%3A2920%2Fannounce&tr=udp%3A%2F%2Ftracker.pirateparty.gr%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.cyberia.is%3A6969%2Fannounce');
INSERT INTO "DLC" (app_id,title,finished) VALUES ('ALZJ01','The Champions Ballad',true);
INSERT INTO "DLC" (app_id,title,finished) VALUES ('ALZJ01','The Master Trials',true);
INSERT INTO "DLC" (app_id,title,finished) VALUES ('RHDE8P','The House of the Dead 2',true);
INSERT INTO "DLC" (app_id,title,finished) VALUES ('RHDE8P','The House of the Dead 3',true);
UPDATE "Wii" SET collection = true WHERE app_id = 'RHDE8P';
UPDATE "DLC" SET collection = true WHERE app_id = 'RHDE8P';
UPDATE "DLC" set app_id = '108710' WHERE app_id = '202750';
UPDATE "DLC" set app_id = '212480' WHERE app_id = '229660';