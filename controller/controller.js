const queries = require("../db/queries");

function kebabToSentenceCase(kebabCase) {
  return kebabCase
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function formGet(req, res) {
  res.render("form");
}

async function addMoviePost(req, res) {
  await queries.addDirector(req.body.directorName);
  console.log(req.body);
}

async function addDirectorPost(req, res) {}

async function addActorPost(req, res) {}

async function movieByDirectorGet(req, res) {
  const directorName = kebabToSentenceCase(req.params.directorName);
  const moviesByDirector = await queries.getMovieByDirector(directorName);
  console.log(directorName);
  res.render("directorPage", {
    title: directorName,
    movies: moviesByDirector,
  });
}

async function movieGet(req, res) {
  const movieDetails = await queries.getMovie(
    kebabToSentenceCase(req.params.movieName),
  );
  const releaseDate = new Date(movieDetails.release_date);
  const dateString = `${releaseDate.toLocaleDateString("default", { month: "long" })} ${releaseDate.getDate()}, ${releaseDate.getFullYear()}`;
  movieDetails.release_date = dateString;
  console.log(movieDetails);
  res.render("moviePage", { movie: movieDetails });
}

module.exports = {
  formGet,
  addMoviePost,
  movieGet,
  movieByDirectorGet,
};
