const pool = require("../db/pool");
const queries = require("../db/queries");

function kebabToSentenceCase(kebabCase) {
  return kebabCase
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

async function formGet(req, res) {
  const directorList = await queries.getAllDirectors();
  res.render("form", { directorList: directorList });
}

function directorFormGet(req, res) {
  res.render("directorForm");
}

async function homePageGet(req, res) {
  const allMovies = await queries.getAllMovies();
  const allDirectors = await queries.getAllDirectors();
  console.log(allDirectors);
  res.render("home", { allMovies: allMovies, allDirectors: allDirectors });
}

async function addMoviePost(req, res) {
  // TODO add form validation
  const cast = req.body.cast.split(/[\s,]+/);
  await queries.addDirector(req.body.directorName);
  await queries.addMovie(req.body);
  res.redirect("/new");
}

async function addDirectorPost(req, res) {}

async function movieByDirectorGet(req, res) {
  const directorName = kebabToSentenceCase(req.params.directorName);
  const dob = await queries.getDob(directorName);
  const moviesByDirector = await queries.getMovieByDirector(directorName);
  const dateOb = new Date(dob[0].dob);
  const dateString = `${dateOb.toLocaleDateString("default", { month: "long" })} ${dateOb.getDate()}, ${dateOb.getFullYear()}`;
  res.render("directorPage", {
    title: directorName,
    dob: dateString,
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
  homePageGet,
  formGet,
  addMoviePost,
  movieGet,
  movieByDirectorGet,
  directorFormGet,
};
