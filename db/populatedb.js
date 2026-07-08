// Run only one time to create database
const { Client } = require("pg");
const fs = require("node:fs/promises");

const INIT_DB_QUERY = `
CREATE TABLE IF NOT EXISTS directors (
    id      integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name    varchar(255) NOT NULL,
    dob     date NOT NULL CHECK (dob < CURRENT_DATE)
);

CREATE TABLE IF NOT EXISTS movies (
    id              integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name            varchar(255) NOT NULL,
    director_id     integer REFERENCES directors,
    release_date    date NOT NULL,
    runtime         interval HOUR TO MINUTE NOT NULL
);

CREATE TABLE IF NOT EXISTS actors (
    id      integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name    varchar(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS castings (
    actor_id    integer REFERENCES actors,
    movie_id    integer REFERENCES movies,
    character   varchar(255) NOT NULL,
    PRIMARY KEY (actor_id, movie_id)
);
`;

const INSERT_VALUES_QUERY = `
INSERT INTO directors (name, dob) VALUES
    ('Christopher Nolan', '1970-07-30'),
    ('Steven Spielberg', '1946-12-18'),
    ('David Fincher', '1962-08-28'),
    ('Ridley Scott', '1937-11-30');

INSERT INTO movies (name, director_id, release_date, runtime) VALUES
    ('Interstellar', (SELECT id FROM directors WHERE directors.name = 'Christopher Nolan'), '2014-10-26', '2 hours 49 minutes'),
    ('Jurassic Park', (SELECT id FROM directors WHERE directors.name = 'Steven Spielberg'), '1993-06-09', '2 hours 7 minutes'),
    ('The Social Network', (SELECT id FROM directors WHERE directors.name = 'David Fincher'), '2010-09-24', '2 hours'),
    ('The Martian', (SELECT id FROM directors WHERE directors.name = 'Ridley Scott'), '2011-09-11', '2 hours 24 minutes');

INSERT INTO actors (name) VALUES
    ('Matthew McConaughey'),
    ('Anne Hathway'),
    ('Matt Damon'),
    ('Sam Neill'),
    ('Jeff Goldblum'),
    ('Richard Attenborough'),
    ('Jesse Eisenberg'),
    ('Andrew Garfield');

INSERT INTO castings (actor_id, movie_id, character) VALUES
    (1, 1, 'Cooper'),
    (2, 1, 'Brand'),
    (3, 1, 'Mann'),
    (4, 2, 'Grant'),
    (5, 2, 'Malcolm'),
    (6, 2, 'Hammond'),
    (7, 3, 'Mark Zuckerberg'),
    (8, 3, 'Eduardo Saverin'),
    (3, 4, 'Mark Watney');
`;

process.loadEnvFile(".env");

async function initDb() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  await client.connect();
  console.log("Creating Tables...");
  await client.query(INIT_DB_QUERY);
  console.log("Tables Created");
  console.log("Inserting Values...");
  await client.query(INSERT_VALUES_QUERY);
  console.log("Values Inserted");
  await client.end();
}

initDb();
