// routes/user.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.index);
router.get('/log-out', userController.log_out);

module.exports = router;
