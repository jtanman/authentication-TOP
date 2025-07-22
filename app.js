/////// app.js

require('dotenv').config();
const path = require("node:path");
const { Pool } = require("pg");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const port = 3000; // Define the port for the server

const pool = new Pool({
  connectionString: `postgresql://postgres.bfuxedgtnsqidizgwtbk:${process.env.SUPABASE_PW}@aws-0-us-west-1.pooler.supabase.com:6543/postgres`,
});

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => res.render("index"));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

