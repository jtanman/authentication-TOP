// controllers/userController.js

const { Pool } = require('pg');
const encodedPw = encodeURIComponent(process.env.SUPABASE_PW);
const pool = new Pool({
  connectionString: `postgresql://postgres.bfuxedgtnsqidizgwtbk:${encodedPw}@aws-0-us-west-1.pooler.supabase.com:6543/postgres`,
});

exports.index = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.render('index', { users: result.rows, user: req.user });
  } catch (err) {
    res.status(500).send('Database error: ' + err.message);
  }
};

exports.log_out = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
};
