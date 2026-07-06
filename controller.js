const queries = require("./queries");

async function addMoviePost(req, res) {}

async function addDirectorPost(req, res) {}

async function addActorPost(req, res) {}

async function movieByDirectorGet(params) {}

async function movieGet(req, res) {
  const name = req.params.movie;
  const movieDetails = await queries.getMovie(req.params.movieName);
  const releaseDate = new Date(movieDetails.release_date);
  const dateString = `${releaseDate.toLocaleDateString("default", { month: "long" })} ${releaseDate.getDate()}, ${releaseDate.getFullYear()}`;
  movieDetails.release_date = dateString;
  console.log(movieDetails);
  res.render("moviePage", { movie: movieDetails });
}

module.exports = {
  movieGet,
};
