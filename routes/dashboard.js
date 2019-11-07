"use strict";

const express = require('express');
const router = express.Router();

const DashboardController = require('../controllers/dashboard');

router.get('/',DashboardController.dashboard_get);

module.exports = router;