// routes/auth.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');


router.get('/sign-up', authController.sign_up_get);
router.post('/sign-up', authController.sign_up_post);

module.exports = router;
