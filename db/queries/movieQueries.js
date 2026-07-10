const pool = require("../pool");

exports.deleteMovie = async (id) => {
  await pool.query("delete from movies where id = $1;", [id]);
};
