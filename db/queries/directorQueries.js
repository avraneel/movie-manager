const pool = require("../pool");

exports.deleteDirectors = async (id) => {
  await pool.query("delete from movies where director_id = $1;", [id]);
  await pool.query("delete from directors where id = $1;", [id]);
};
