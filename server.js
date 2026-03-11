const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const nodemailer = require("nodemailer"); // <-- new
const app = express();
const PORT = 3000;

// Serve static files
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to SQLite database
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

// In-memory OTP store
const otpStore = {}; // { email: { otp: '123456', expires: Date } }

// Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "biseshghimire243@gmail.com",        // <-- replace with your Gmail
        pass: "bofm dqdc qgxu bwvc"            // <-- replace with Gmail App Password
    }
});

// Send OTP route
app.post("/forgot-password/send-otp", (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).send({ success: false, message: "Email is required" });

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = Date.now() + 5 * 60 * 1000; // OTP valid 5 minutes
    otpStore[email] = { otp, expires };

    // Send OTP via email
    const mailOptions = {
        from: "biseshghimire243@gmail.com",
        to: email,
        subject: "Your OTP for Sushma Library",
        text: `Your OTP is: ${otp}. It will expire in 5 minutes.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            return res.status(500).send({ success: false, message: "Failed to send OTP" });
        }
        res.send({ success: true, message: "OTP sent to your email" });
    });
});

// Verify OTP route
app.post("/forgot-password/verify-otp", (req, res) => {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).send({ success: false, message: "Email and OTP required" });

    const record = otpStore[email];
    if (!record) return res.send({ success: false, message: "No OTP requested for this email" });

    if (Date.now() > record.expires) {
        delete otpStore[email];
        return res.send({ success: false, message: "OTP expired" });
    }

    if (otp !== record.otp) return res.send({ success: false, message: "Invalid OTP" });

    // OTP verified
    delete otpStore[email]; // Remove after verification
    res.send({ success: true, message: "OTP verified" });
});

// Change password route
app.post("/forgot-password/change-password", (req, res) => {
    const { email, newPassword, confirmPassword } = req.body;
    if (!email || !newPassword || !confirmPassword) return res.status(400).send({ success: false, message: "All fields required" });
    if (newPassword !== confirmPassword) return res.send({ success: false, message: "Passwords do not match" });

    // Update password in database
    db.run("UPDATE users SET password=? WHERE username=?", [newPassword, email], function(err) {
        if (err) return res.status(500).send({ success: false, message: "Database error" });
        if (this.changes === 0) return res.send({ success: false, message: "User not found" });
        res.send({ success: true, message: "Password updated successfully" });
    });
});

// Redirect to main website after login
app.get("/index.html", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));