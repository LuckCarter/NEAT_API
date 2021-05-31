"use strict";

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.array.find.js");

var Product = require('../models/product.model');

var bcrypt = require('bcrypt');

exports.create = function (req, res, err) {
  var product = new Product({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    categories: req.body.categories,
    image: req.body.image
  });
  product.save().then(function (data) {
    res.send(data);
  })["catch"](function (err) {
    res.status(500).send({
      message: err.message
    });
  });
};

exports.findAll = function (req, res) {
  Product.find().then(function (products) {
    res.send(products);
  })["catch"](function (err) {
    res.status(500).send({
      message: err.message || "An error has occurred while fetching all products."
    });
  });
};

exports.findById = function (req, res) {
  Product.findById(_id = req.params.id).then(function (product) {
    res.send(product);
  })["catch"](function (err) {
    res.status(500).send({
      message: err.message || "An error has occurred while fetching the product."
    });
  });
};

exports.findByIdAndUpdate = function (req, res) {
  Product.findByIdAndUpdate(req.params.id, req.body, {
    "new": true
  }).then(function (product) {
    res.send(product);
  })["catch"](function (err) {
    res.status(500).send({
      message: err.message || "An error has occurred while updating the product."
    });
  });
};

exports.findByIdAndRemove = function (req, res) {
  Product.findByIdAndDelete(req.params.id).then(function (product) {
    res.send(product);
  })["catch"](function (err) {
    res.status(500).send({
      message: err.message || "An error has occurred while deleting the product."
    });
  });
};
//# sourceMappingURL=product.controller.js.map