"use strict";

var express = require('express');

var router = express.Router();

var authRouter = require('./auth.route');

var userRouter = require('./user.route');

var orderRouter = require('./order.route');

var productRouter = require('./product.route');

router.use(authRouter);
router.use(userRouter);
router.use(orderRouter);
router.use(productRouter);
module.exports = router;
//# sourceMappingURL=index.js.map