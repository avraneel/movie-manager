const pool = require("./pool");

async function addMovie(movie) {}

async function addActor(actor) {}

async function addDirector(director) {}

async function getMovieByDirector(category) {}

async function getMovie(name) {
  const queryName = name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  const { rows } = await pool.query(
    `select movies.name as movie_name, directors.name as director, release_date, runtime 
        from movies 
        join directors on movies.director_id = directors.id
        where movies.name = ($1);`,
    [queryName],
  );
  const castArray = await getCast(queryName);
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
  getMovie,
};
