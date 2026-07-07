const pool = require("./pool");

async function addMovie(movie) {}

async function addActor(actor) {}

async function addDirector(director) {
  await pool.query(`insert into directors (name) values ($1)`, [director]);
}

async function getMovieByDirector(name) {
  const { rows } = await pool.query(
    `select movies.name as movie_name from movies join directors on movies.director_id = directors.id where directors.name = ($1);`,
    [name],
  );
  const movies = rows.map((item) => item.movie_name);
  return movies;
}

async function getMovie(name) {
  const { rows } = await pool.query(
    `select movies.name as movie_name, directors.name as director, release_date, runtime 
        from movies 
        join directors on movies.director_id = directors.id
        where movies.name = ($1);`,
    [name],
  );
  const castArray = await getCast(name);
  const movie = rows[0];
  movie.cast = castArray;
  return movie;
}

async function getCast(name) {
  const { rows } = await pool.query(
    `select actors.name as actor_name from movies 
            join castings on movies.id = castings.movie_id
            join actors on castings.actor_id = actors.id
            where movies.name = ($1);`,
    [name],
  );
  const castArray = rows.map((actor) => actor.actor_name);
  return castArray;
}

module.exports = {
  addDirector,
  getMovie,
  getMovieByDirector,
};
