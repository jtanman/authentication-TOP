// Handle POST /sign-up
const { Pool } = require('pg');
const encodedPw = encodeURIComponent(process.env.SUPABASE_PW);
const pool = new Pool({
  connectionString: `postgresql://postgres.bfuxedgtnsqidizgwtbk:${encodedPw}@aws-0-us-west-1.pooler.supabase.com:6543/postgres`,
});

exports.sign_up_post = async (req, res, next) => {
  try {
    await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [
      req.body.username,
      req.body.password,
    ]);
    res.redirect("/");
  } catch(err) {
    return next(err);
  }
};
// controllers/authController.js

exports.sign_up_get = (req, res) => {
  res.render("sign-up-form");
};
