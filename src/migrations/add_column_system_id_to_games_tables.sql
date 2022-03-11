alter table "Origin" add column system_id int references "System";

alter table "Steam" add column system_id int references "System";

alter table "Ubisoft" add column system_id int references "System";

alter table "GameCube" add column system_id int references "System";

alter table "Wii" add column system_id int references "System";

alter table "WiiU" add column system_id int references "System";

alter table "VirtualConsole" add column system_id int references "System";
