const queries = require("../db/queries/queries");
const movieQueries = require("../db/queries/movieQueries");

exports.deleteMovieGet = async (req, res) => {
  const movieList = await queries.getAllMovies();
  res.render("deleteForm", { list: movieList });
};

exports.deleteMoviePost = async (req, res) => {
  await movieQueries.deleteMovie(req.body.movieName);
  res.redirect("/");
};

// TODO add delete form post
