const sqlite3 = require("sqlite3").verbose();
const path = require("path");
require("dotenv").config();

// Database file path from .env
const dbPath = path.resolve(__dirname, process.env.DATABASE_PATH);

// Create and connect to SQLite database
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("❌ Error connecting to database:", err.message);
  } else {
    console.log("📁 Connected to SQLite database:", dbPath);
  }
});

module.exports = db;
