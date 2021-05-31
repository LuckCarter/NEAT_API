"use strict";

require("core-js/modules/es.array.find.js");

var User = require('../models/user.model');

var bcrypt = require('bcrypt');

var userValidationSchema = require("../utils/validators/user.validation");

exports.create = function (req, res, err) {
  var validation = userValidationSchema.validate(req.body);

  if (validation.error) {
    return res.status(400).send(validation.error);
  }

  var hashedPassword = bcrypt.hashSync(req.body.password, 8);
  var user = new User({
    email: req.body.email,
    password: hashedPassword,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    address: req.body.address,
    phone: req.body.phone,
    admin: false
  });
  user.save().then(function (data) {
    res.send(data);
  })["catch"](function (err) {
    res.status(500).send({
      message: err.message
    });
  });
};

exports.findAll = function (req, res) {
  User.find().then(function (users) {
    res.send(users);
  })["catch"](function (err) {
    res.status(500).send({
      message: err.message || "An error has occurred while fetching all users."
    });
  });
};

exports.findById = function (req, res) {
  User.findById(_id = req.params.id).then(function (user) {
    res.send(user);
  })["catch"](function (err) {
    res.status(500).send({
      message: err.message || "An error has occurred while fetching the user."
    });
  });
};

exports.findByIdAndUpdate = function (req, res) {
  if (req.body.password) req.body.password = bcrypt.hashSync(req.body.password, 8);
  User.findByIdAndUpdate(req.params.id, req.body, {
    "new": true
  }).then(function (user) {
    res.send(user);
  })["catch"](function (err) {
    res.status(500).send({
      message: err.message || "An error has occurred while updating the user."
    });
  });
};

exports.findByIdAndRemove = function (req, res) {
  User.findByIdAndDelete(req.params.id).then(function (user) {
    res.send(user);
  })["catch"](function (err) {
    res.status(500).send({
      message: err.message || "An error has occurred while deleting the user."
    });
  });
};
//# sourceMappingURL=user.controller.js.map