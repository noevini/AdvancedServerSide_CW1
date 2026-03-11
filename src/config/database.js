const sqlite3 = require("sqlite3").verbose();

const dbPath = process.env.DB_FILE || "./database.sqlite";

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Database connection error:", err.message);
  } else {
    console.log("Connected to SQLite database");
  }
});

module.exports = db;
