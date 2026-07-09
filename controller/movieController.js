const queries = require("../db/queries");

exports.deleteMovieGet = async (req, res) => {
  const movieList = await queries.getAllMovies();
  res.render("deleteForm", { list: movieList });
};

// TODO add delete form post
