// Handle POST /sign-up
const { Pool } = require('pg');
const bcrypt = require("bcryptjs");

const encodedPw = encodeURIComponent(process.env.SUPABASE_PW);
const pool = new Pool({
  connectionString: `postgresql://postgres.bfuxedgtnsqidizgwtbk:${encodedPw}@aws-0-us-west-1.pooler.supabase.com:6543/postgres`,
});

exports.sign_up_post = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [
      req.body.username,
      hashedPassword,
    ]);
    res.redirect("/");
  } catch(err) {
    console.error(err);
    return next(err);
  }
};
// controllers/authController.js

exports.sign_up_get = (req, res) => {
  res.render("sign-up-form");
};
