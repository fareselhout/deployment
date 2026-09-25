const pool = require("../config/db.js");

const createTable = async () => {
    const queryText = `
CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
)
`;
    try {
        pool.query(queryText);
        console.log("Table craeted if not exists...");
    }
    catch (error) {
        console.log("Error creating users table:", error);
    }
}

module.exports = createTable;