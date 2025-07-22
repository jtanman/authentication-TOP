/////// app.js

require('dotenv').config();
const path = require("node:path");
const { Pool } = require("pg");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const port = 3000; // Define the port for the server

const encodedPw = encodeURIComponent(process.env.SUPABASE_PW);
const pool = new Pool({
  connectionString: `postgresql://postgres.bfuxedgtnsqidizgwtbk:${encodedPw}@aws-0-us-west-1.pooler.supabase.com:6543/postgres`,
});

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.render("index", { users: result.rows });
  } catch (err) {
    res.status(500).send("Database error: " + err.message);
  }
});

const authRouter = require('./routes/auth');
app.use('/', authRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

