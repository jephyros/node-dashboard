"use strict";
const express = require('express');
const router = express.Router();

const APILogin = require('../controllers/api/login');

router.post('/signup',APILogin.signup_post);
router.post('/mypage',APILogin.mypage_post);


module.exports = router;