//routing and server requirements
const express = require('express');
const router = express.Router();
const authController = require('../controllers/AuthController');

//i need a few more steps here because if any of the inputs are taken it will throw an error
router.post('/register', authController.registerUser);

router.post('/login', authController.loginUser);

router.post('/gsignin', authController.googleSignIn);

module.exports = router;
