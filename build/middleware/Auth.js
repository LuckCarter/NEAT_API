"use strict";

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.split.js");

var jwt = require('jsonwebtoken');

var _require = require('../configs/jwt.config'),
    jwtConfig = _require["default"];

module.exports = function (req, res, next) {
  var authHeader = req.get('Authorization');

  if (!authHeader) {
    req.isAuth = false;
    return next();
  }

  var token = authHeader.split(' ')[1]; //Bearer token

  if (!token || token === '') {
    req.isAuth = false;
    return next();
  }

  var decodedToken;

  try {
    decodedToken = jwt.verify(token, jwtConfig.secret);
  } catch (err) {
    req.isAuth = false;
    return next();
  }

  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }

  req.isAuth = true;
  req.userId = decodedToken.userId;
  next();
};
//# sourceMappingURL=Auth.js.map