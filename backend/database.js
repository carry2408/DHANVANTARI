const Database = require("better-sqlite3");
const path = require("path");
require("dotenv").config();

// Resolve database path correctly
const dbPath = path.resolve(__dirname, process.env.DATABASE_PATH);

// Connect to SQLite using better-sqlite3
let db;

try {
  db = new Database(dbPath, {
    verbose: console.log,  // optional: logs SQL statements
  });

  console.log("📁 Connected to SQLite database using better-sqlite3:", dbPath);
} catch (err) {
  console.error("❌ Failed to connect to database:", err.message);
  process.exit(1);
}

module.exports = db;
