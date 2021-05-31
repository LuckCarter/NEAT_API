"use strict";

var express = require('express');

var router = express.Router();

var user = require('../controllers/user.controller');

var verifyAuth = require('../utils/verifyAuth');

var verifyPerm = require('../utils/verifyPerm');

router.post('/users/', user.create);
router.get('/users/', verifyAuth, user.findAll);
router.get('/user/:id', verifyAuth, user.findById);
router.patch('/user/:id', verifyAuth, user.findByIdAndUpdate);
router["delete"]('/user/:id', verifyAuth, user.findByIdAndRemove);
module.exports = router;
//# sourceMappingURL=user.route.js.map