const pg = require("pg");
const { Pool } = pg;

const pool = new Pool({
   connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

pool.on("connect", () => console.log("Connection pool established with database..."));

module.exports = pool;
