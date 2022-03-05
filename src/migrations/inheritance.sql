CREATE SCHEMA develop;

CREATE table develop."Games" (
    id SERIAL PRIMARY KEY,
    app_id varchar NOT NULL ,
    title varchar NOT NULL ,
    finished boolean DEFAULT false NOT NULL ,
    finished_at timestamp,
    created_at timestamp DEFAULT now() not null,
    updated_at timestamp DEFAULT now() not null
);

ALTER TABLE develop."Games" ADD CONSTRAINT app_id_unique UNIQUE (app_id);
ALTER TABLE develop."Games" ADD CONSTRAINT check_finished
    CHECK ((finished = false AND finished_at is null) OR (finished = true AND finished_at is not null));


CREATE table develop."SteamGames" (
 collection boolean DEFAULT false NOT NULL
) INHERITS (develop."Games");

CREATE table develop."UbisoftGames" (
 collection boolean DEFAULT false NOT NULL
) INHERITS (develop."Games");

CREATE table develop."OriginGames" (
 collection boolean DEFAULT false NOT NULL
) INHERITS (develop."Games");

CREATE table develop."WiiUGames" (
 collection boolean DEFAULT false NOT NULL,
 genuine boolean DEFAULT false NOT NULL,
 fisical_disc boolean DEFAULT false NOT NULL
) INHERITS (develop."Games");

CREATE table develop."WiiGames" (
 collection boolean DEFAULT false NOT NULL,
 genuine boolean DEFAULT false NOT NULL,
 fisical_disc boolean DEFAULT false NOT NULL
) INHERITS (develop."Games");

CREATE table develop."GameCubeGames" (
 collection boolean DEFAULT false NOT NULL,
 genuine boolean DEFAULT false NOT NULL,
 fisical_disc boolean DEFAULT false NOT NULL
) INHERITS (develop."Games");

CREATE table develop."DLCGames" (
id SERIAL PRIMARY KEY,
app_id varchar NOT NULL ,
title varchar NOT NULL ,
finished boolean DEFAULT false NOT NULL ,
finished_at timestamp,
collection boolean DEFAULT false,
created_at timestamp DEFAULT now() not null,
updated_at timestamp DEFAULT now() not null
);

ALTER TABLE develop."DLCGames" ADD CONSTRAINT check_finished
    CHECK ((finished = false AND finished_at is null) OR (finished = true AND finished_at is not null));

CREATE table develop."VirtualConsoleGames" (
id SERIAL PRIMARY KEY,
app_id varchar NOT NULL ,
title varchar NOT NULL ,
finished boolean DEFAULT false,
finished_at timestamp,
genuine boolean DEFAULT false,
platform varchar NOT NULL,
system varchar NOT NULL,
created_at timestamp DEFAULT now() not null,
updated_at timestamp DEFAULT now() not null
);

ALTER TABLE develop."VirtualConsoleGames" ADD CONSTRAINT check_finished
    CHECK ((finished = false AND finished_at is null) OR (finished = true AND finished_at is not null));

create table develop."Categories" (
id serial primary key,
slugname varchar not null,
name varchar not null,
created_at timestamp default now() not null,
updated_at timestamp default now() not null,
constraint cat_name_slug_constraint unique (slugname, name)
);

create table develop."GamesCategories" (
id serial primary key,
app_id varchar NOT NULL,
category_id integer references develop."Categories",
created_at timestamp default now() not null,
updated_at timestamp default now() not null
);

create table develop."Playing" (
id serial primary key,
app_id varchar,
title varchar NOT NULL,
started_at timestamp default now() NOT NULL ,
finished boolean DEFAULT false NOT NULL,
finished_at timestamp,
created_at timestamp default now() not null,
updated_at timestamp default now() not null
);

ALTER TABLE develop."Playing" ADD CONSTRAINT check_finished
    CHECK ((finished = false AND finished_at is null) OR (finished = true AND finished_at is not null));

create table develop."ToBuy" (
id serial primary key,
title varchar NOT NULL ,
finished boolean DEFAULT false NOT NULL ,
finished_at timestamp,
system varchar not null ,
created_at timestamp default now() not null,
updated_at timestamp default now() not null,
magnetic_link text
);

ALTER TABLE develop."ToBuy" ADD CONSTRAINT check_finished
    CHECK ((finished = false AND finished_at is null) OR (finished = true AND finished_at is not null));

CREATE OR REPLACE VIEW develop."AllAppIds" AS
    SELECT app_id, 'Steam' AS table FROM develop."SteamGames"
UNION
    SELECT app_id, 'Origin' AS table FROM develop."OriginGames"
UNION
    SELECT app_id, 'Ubisoft' AS table FROM develop."UbisoftGames"
UNION
    SELECT app_id, 'GameCube' AS table FROM develop."GameCubeGames"
UNION
    SELECT app_id, 'Wii' AS table FROM develop."WiiGames"
UNION
    SELECT app_id, 'WiiU' AS table FROM develop."WiiUGames";

create function develop.app_id_exists(appid varchar)
    returns boolean
    language plpgsql
    as
$$
    declare
       bool boolean;
    begin
        SELECT (CASE
           WHEN exists(select 1 from develop."GameCubeGames" where app_id = appid) THEN true
           WHEN exists(select 1 from develop."WiiGames" where app_id = appid) THEN true
           WHEN exists(select 1 from develop."WiiUGames" where app_id = appid) THEN true
           WHEN exists(select 1 from develop."OriginGames" where app_id = appid) THEN true
           WHEN exists(select 1 from develop."UbisoftGames" where app_id = appid) THEN true
           WHEN exists(select 1 from develop."SteamGames" where app_id = appid) THEN true
           ELSE false
       END) INTO bool;

          return bool;
     end;
$$;

ALTER TABLE develop."DLCGames" ADD CONSTRAINT check_app_id
    CHECK (develop.app_id_exists(app_id));

CREATE OR REPLACE FUNCTION develop.trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON develop."Games"
FOR EACH ROW
EXECUTE PROCEDURE develop.trigger_set_timestamp();

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON develop."DLCGames"
FOR EACH ROW
EXECUTE PROCEDURE develop.trigger_set_timestamp();

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON develop."VirtualConsoleGames"
FOR EACH ROW
EXECUTE PROCEDURE develop.trigger_set_timestamp();

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON develop."Categories"
FOR EACH ROW
EXECUTE PROCEDURE develop.trigger_set_timestamp();

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON develop."GamesCategories"
FOR EACH ROW
EXECUTE PROCEDURE develop.trigger_set_timestamp();

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON develop."Playing"
FOR EACH ROW
EXECUTE PROCEDURE develop.trigger_set_timestamp();

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON develop."ToBuy"
FOR EACH ROW
EXECUTE PROCEDURE develop.trigger_set_timestamp();

-- COPY DATA
INSERT INTO develop."SteamGames" (app_id, title, finished, finished_at, collection, created_at, updated_at)
                  SELECT app_id, title, finished, finished_at, collection, created_at, updated_at FROM public."Steam" ORDER BY id;

INSERT INTO develop."OriginGames" (app_id, title, finished, finished_at, collection, created_at, updated_at)
                  SELECT gen_random_uuid(), title, finished, finished_at, false, created_at, updated_at FROM public."Origin" ORDER BY id;

INSERT INTO develop."UbisoftGames" (app_id, title, finished, finished_at, collection, created_at, updated_at)
                  SELECT gen_random_uuid(), title, finished, finished_at, false, created_at, updated_at FROM public."Origin" ORDER BY id;

INSERT INTO develop."WiiUGames" (app_id, title, finished, finished_at, collection, genuine, fisical_disc, created_at, updated_at)
                  SELECT app_id, title, finished, finished_at, collection, genuine, fisical_disc, created_at, updated_at FROM public."WiiU" ORDER BY id;

INSERT INTO develop."WiiGames" (app_id, title, finished, finished_at, collection, genuine, fisical_disc, created_at, updated_at)
                  SELECT app_id, title, finished, finished_at, collection, genuine, fisical_disc, created_at, updated_at FROM public."Wii" ORDER BY id;

INSERT INTO develop."GameCubeGames" (app_id, title, finished, finished_at, collection, genuine, fisical_disc, created_at, updated_at)
                  SELECT app_id, title, finished, finished_at, collection, genuine, fisical_disc, created_at, updated_at FROM public."GameCube" ORDER BY id;

INSERT INTO develop."DLCGames" (app_id, title, finished, finished_at, collection, created_at, updated_at)
                  SELECT app_id, title, finished, finished_at, collection, created_at, updated_at FROM public."DLC" ORDER BY id;

INSERT INTO develop."Categories" (slugname, name)
                  SELECT slugname, name FROM public."Category" ORDER BY id;

INSERT INTO develop."ToBuy" (title, finished, finished_at, system, created_at, updated_at, magnetic_link)
                SELECT title, finished, finished_at, system, created_at, updated_at, magnetic_link FROM public."ToBuy" ORDER BY id;

INSERT INTO develop."GamesCategories" (app_id, category_id)
                SELECT app_id, category_id FROM public."GamesCategories" ORDER BY id;

-- COPY DATA