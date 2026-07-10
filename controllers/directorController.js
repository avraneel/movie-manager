const queries = require("../db/queries/queries");
const directorQueries = require("../db/queries/directorQueries");

exports.deleteDirectorGet = async (req, res) => {
  const directors = await queries.getAllDirectors();
  res.render("deleteDirector", { list: directors });
};

exports.deleteDirectorPost = async (req, res) => {
  const directors = await directorQueries.deleteDirectors(
    req.body.directorName,
  );
  res.redirect("/");
};
