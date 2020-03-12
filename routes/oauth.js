const express = require('express');
const { check } = require('express-validator');
const oauthController = require('../client/controllers/oauthController');

const router = express.Router();

router.post('/login', oauthController.login);

module.exports = router;