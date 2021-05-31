"use strict";

var jwtConfig = require('../configs/jwt.config');

var jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  var token = req.headers['x-access-token'];

  if (!token) {
    return res.status(400).send({
      auth: false,
      message: "The request has not been applied because the authentication token is missing."
    });
  }

  jwt.verify(token, jwtConfig.secret, function (err, decoded) {
    if (err) {
      console.log("[AUTH] " + err);
      return res.status(401).send({
        auth: false,
        message: "The request has not been applied because it lacks valid authentication credentials for the target resource."
      });
    }

    next();
  });
}

module.exports = verifyToken;
//# sourceMappingURL=verifyAuth.js.map