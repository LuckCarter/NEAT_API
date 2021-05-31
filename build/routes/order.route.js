"use strict";

var express = require('express');

var router = express.Router();

var order = require('../controllers/order.controller');

var verifyAuth = require('../utils/verifyAuth');

var verifyPerm = require('../utils/verifyPerm');

router.post('/orders/', order.create);
router.get('/orders/', verifyAuth, order.findAll);
router.get('/order/:id', verifyAuth, order.findById);
router.get('/order/user/:id', verifyAuth, order.findByUserId);
router.patch('/order/:id', verifyAuth, order.findByIdAndUpdate);
router["delete"]('/order/:id', verifyAuth, order.findByIdAndRemove);
module.exports = router;
//# sourceMappingURL=order.route.js.map