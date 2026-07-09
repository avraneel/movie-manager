const pool = require("./pool");

async function addMovie(movie) {
  console.log(movie.runTimeHours);
  const runTimeString = `${movie.runtimeHours} hours ${movie.runtimeMinutes} minutes`;
  await pool.query(
    `insert into movies (name, director_id, release_date, runtime)
      values ($1, (select id from directors where directors.name = $2 limit 1), $3, $4)
      on conflict (id) do nothing;`,
    [movie.name, movie.directorName, movie.releaseDate, runTimeString],
  );
}

async function getAllDirectors() {
  const { rows } = await pool.query("select * from directors;");
  return rows;
}

async function addDirector(director) {
  // TODO restructure it to add to director db
  await pool.query(
    `insert into directors (name) values ($1)
      on conflict (id) do nothing;`,
    [director],
  );
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
  const movie = rows[0];
  return movie;
}

async function getDob(name) {
  const { rows } = await pool.query(
    "select dob from directors where directors.name = $1;",
    [name],
  );
  return rows;
}

async function getAllMovies() {
  const { rows } = await pool.query("select * from movies;");
  return rows;
}

module.exports = {
  getDob,
  addDirector,
  getAllDirectors,
  addMovie,
  getMovie,
  getAllMovies,
  getMovieByDirector,
};
