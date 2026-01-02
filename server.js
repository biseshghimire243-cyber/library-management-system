const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const app = express();
const PORT = 3000;

// Serve static files
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to SQLite database (or create it)
const db = new sqlite3.Database("./database.db", (err) => {
    if (err) console.error(err.message);
    else console.log("Connected to database.db");
});

// Create users table if it doesn't exist
db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
)`);

// Add default admin user if not exists
db.run(`INSERT OR IGNORE INTO users (username, password) VALUES (?, ?)`, ["admin", "admin123"]);

// Handle login requests
app.post("/login", (req, res) => {
    const { username, password } = req.body;
    db.get("SELECT * FROM users WHERE username=? AND password=?", [username, password], (err, row) => {
        if (err) return res.status(500).send({ success: false, message: "Database error" });
        if (row) res.send({ success: true });
        else res.send({ success: false, message: "Invalid username or password" });
    });
});

// Redirect to main website after login
app.get("/index.html", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
