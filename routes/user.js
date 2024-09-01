const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getUser);

// POST Signup
router.post('/signup', userController.postSignup);

// POST Login
router.post('/login', userController.postLogin);

module.exports = router;
