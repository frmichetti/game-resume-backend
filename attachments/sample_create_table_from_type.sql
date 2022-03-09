CREATE TYPE wiiu_type AS (id int, app_id varchar, title varchar, finished boolean, finished_at timestamp,
collection boolean, genuine boolean, fisical_disc boolean, created_at timestamp, updated_at timestamp);

CREATE TABLE wiiu OF wiiu_type (PRIMARY KEY (id));

SELECT t.id AS trash_id, t.table_name AS table_name, d.*
FROM "Trash" t, jsonb_populate_record(null::wiiu_type, t.data) d WHERE table_name = 'WiiU';