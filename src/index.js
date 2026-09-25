const express = require("express");
const app = express();
require("dotenv").config();
const cors = require('cors');
const port = process.env.PORT || 3001;
const pool = require("./config/db.js");
const userRoutes = require("./routes/user-routes.js");
const errorHandling = require("./middlewares/error-handler.js");
const createTable = require("./data/create-users-table.js");
const registerRoutes = require("./routes/register.js");
const authRoutes = require("./routes/auth.js");
const verifyJWT = require("./middlewares/verify-jwt.js");
const cookieParser = require("cookie-parser");
const refreshRoutes = require("./routes/refresh.js");
const logoutRoutes = require("./routes/logout.js");

// Middlewares

app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Routes

app.use("/register", registerRoutes);
app.use("/auth", authRoutes);
app.use("/refresh", refreshRoutes);
app.use("/logout", logoutRoutes);

app.use(verifyJWT)
app.use("/api", userRoutes);

// Error handling middleware

app.use(errorHandling);

// Testing POSTGRES connection

app.get("/", async (req, res) => {
    const result = await pool.query("SELECT current_database()");
    res.send(result.rows[0].current_database);
});

// Create users table

createTable();

// Server running

app.listen(port, () => console.log(`Listening on port ${port}...`));
