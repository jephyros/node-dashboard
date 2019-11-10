"use strict";
const express = require('express');
const router = express.Router();

const Signup = require('../controllers/api/signup');

router.post('/signup',Signup.signup_post);

module.exports = router;