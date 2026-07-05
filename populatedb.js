// Run only one time to create database

const INIT_DB_QUERY = `
DROP DATABASE movie-manager;
CREATE DATABASE movie_manager;

CREATE TABLE IF NOT EXISTS directors (
    director_id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name varchar(255) NOT NULL,
);

CREATE TABLE IF NOT EXISTS movies (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    movie_name varchar(255) NOT NULL,
    director_id integer REFERENCES directors (director_id),
    release_date timestamp,
    run_time interval,
);

CREATE TABLE IF NOT EXISTS actors (
    actor_id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name varchar(255) NOT NULL,
);
`;
