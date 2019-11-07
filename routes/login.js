"use strict";

const express = require('express');
const router = express.Router();

const LoginController = require('../controllers/login');

router.get('/',LoginController.login_get);

module.exports = router