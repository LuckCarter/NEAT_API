"use strict";

var User = require('../models/user.model');

var jwtConfig = require('../configs/jwt.config');

var bcrypt = require('bcrypt');

var jwt = require('jsonwebtoken');

var userValidationSchema = require("../utils/validators/user.validation");

exports.register = function (req, res, err) {
  var validation = userValidationSchema.validate(req.body);
  console.log(validation);

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
    console.log("[DEBUG] User " + req.body.email + " has registered.");
    var userToken = jwt.sign({
      id: user._id,
      admin: user.admin
    }, jwtConfig.secret, {
      expiresIn: 86400
    });
    res.send({
      auth: true,
      token: userToken,
      type: "success",
      message: "User successfully registered."
    });
  })["catch"](function (err) {
    res.status(500).send({
      message: err.message
    });
  });
};

exports.getUserById = function (req, res) {
  User.findById({
    _id: req.params.id
  }, function (err, user) {
    if (err) {
      console.log('[LOG] USER FETCH FAILURE, SEE ERROR LOG:');
      console.log(err);
    }

    res.send(user);
  });
};

exports.login = function (req, res, err) {
  User.findOne({
    email: req.body.email
  }).then(function (user) {
    if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(401).send({
        type: "error",
        message: "The information entered are incorrect."
      });
    }

    var userToken = jwt.sign({
      id: user._id,
      admin: user.admin
    }, jwtConfig.secret, {
      expiresIn: 86400
    });
    res.send({
      auth: true,
      token: userToken
    });
  })["catch"](function (err) {
    return res.status(500).send({
      message: err || "An error occurred when logging in."
    });
  });
};
//# sourceMappingURL=auth.controller.js.map