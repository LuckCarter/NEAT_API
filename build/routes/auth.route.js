"use strict";

var express = require('express');

var router = express.Router();

var auth = require('../controllers/auth.controller');

var verifyAuth = require("../utils/verifyPerm");

router.post('/auth/register', auth.register);
router.post('/auth/login', auth.login);
module.exports = router;
//# sourceMappingURL=auth.route.js.map