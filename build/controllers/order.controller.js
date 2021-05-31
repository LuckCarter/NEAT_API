"use strict";

require("core-js/modules/es.array.find.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.promise.js");

require("regenerator-runtime/runtime.js");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var stripe = require('stripe')(process.env.STRIPE_KEY);

var Order = require('../models/order.model');

var uuid = require('uuid');

var bcrypt = require('bcrypt');

exports.create = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, err) {
    var order;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            order = new Order({
              user: req.body.user,
              products: req.body.products,
              totalPrice: req.body.totalPrice,
              status: req.body.status
            }); // try {
            //     await stripe.charges.create({
            //         source: req.body.stripeToken,
            //         currency: 'eur',
            //         amount: req.body.totalPrice,
            //         description: `Order ${new Date()} by ${req.body.user}`,
            //     });
            // } catch(err) {
            //     console.log(err);
            // }

            order.save().then(function (data) {
              order.status = "processed";
              order.save();
              res.send(data);
            })["catch"](function (err) {
              res.status(500).send({
                message: err.message
              });
            });

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.findAll = function (req, res) {
  Order.find().populate('user').populate('products').then(function (orders) {
    res.send(orders);
  })["catch"](function (err) {
    res.status(500).send({
      message: err.message || "An error has occurred while fetching all orders."
    });
  });
};

exports.findByUserId = function (req, res) {
  Order.find({
    user: req.params.id
  }).populate('products').then(function (order) {
    res.send(order);
  })["catch"](function (err) {
    res.status(500).send({
      message: err.message || "An error has occurred while fetching the order."
    });
  });
};

exports.findById = function (req, res) {
  Order.findById(_id = req.params.id).populate('products').populate('user').then(function (order) {
    res.send(order);
  })["catch"](function (err) {
    res.status(500).send({
      message: err.message || "An error has occurred while fetching the order."
    });
  });
};

exports.findByIdAndUpdate = function (req, res) {
  Order.findByIdAndUpdate(req.params.id, req.body, {
    "new": true
  }).populate('products').populate('user').then(function (order) {
    res.send(order);
  })["catch"](function (err) {
    res.status(500).send({
      message: err.message || "An error has occurred while updating the order."
    });
  });
};

exports.findByIdAndRemove = function (req, res) {
  Order.findByIdAndDelete(req.params.id).then(function (order) {
    res.send(order);
  })["catch"](function (err) {
    res.status(500).send({
      message: err.message || "An error has occurred while deleting the order."
    });
  });
};
//# sourceMappingURL=order.controller.js.map