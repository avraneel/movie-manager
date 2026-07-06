const { Pool } = require("pg");

process.loadEnvFile(".env");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

module.exports = pool;
