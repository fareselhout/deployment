const pg = require("pg");
const { Pool } = pg;

const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    port: process.env.DBPORT,
    password: process.env.PASSWORD,
});

pool.on("connect", () => console.log("Connection pool established with database..."));

module.exports = pool;