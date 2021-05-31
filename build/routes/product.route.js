"use strict";

var express = require('express');

var router = express.Router();

var product = require('../controllers/product.controller');

var verifyAuth = require('../utils/verifyAuth');

var verifyPerm = require('../utils/verifyPerm');

router.post('/products/', product.create);
router.get('/products/', verifyAuth, product.findAll);
router.get('/product/:id', verifyAuth, product.findById);
router.patch('/product/:id', verifyAuth, product.findByIdAndUpdate);
router["delete"]('/product/:id', verifyAuth, product.findByIdAndRemove);
module.exports = router;
//# sourceMappingURL=product.route.js.map