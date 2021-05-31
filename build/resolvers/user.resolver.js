"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.array.find.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.promise.js");

require("regenerator-runtime/runtime.js");

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _mongoose = require("mongoose");

var Models = _interopRequireWildcard(require("../models"));

var _utils = _interopRequireDefault(require("../utils/utils"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

module.exports = {
  Query: {
    users: function users(parent, args, context) {
      // if (!context.req.isAuth) {
      //   throw new Error('Unauthenticated!');
      // }
      return Models.User.find();
    },
    user: function user(parent, args, context) {
      // if (!context.req.isAuth) {
      //   throw new Error("Unauthenticated!");
      // }
      return Models.User.findById(args.id);
    },
    login: function () {
      var _login = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(parent, args, context) {
        var User, valid, token;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return Models.User.find({
                  Email: args.Email
                });

              case 2:
                User = _context.sent;

                if (User[0]) {
                  _context.next = 5;
                  break;
                }

                throw new Error("Email is Incorrect");

              case 5:
                _context.next = 7;
                return _bcrypt["default"].compareSync(args.Password, User[0].Password);

              case 7:
                valid = _context.sent;

                if (valid) {
                  _context.next = 10;
                  break;
                }

                throw new Error("Incorrect password");

              case 10:
                // return json web token
                token = _jsonwebtoken["default"].sign({
                  id: User[0]._id,
                  Email: User[0].Email,
                  IsAdmin: User[0].IsAdmin
                }, process.env.JWT_SECRET, {
                  expiresIn: "1d"
                });
                return _context.abrupt("return", token);

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function login(_x, _x2, _x3) {
        return _login.apply(this, arguments);
      }

      return login;
    }()
  },
  Mutation: {
    deleteUser: function deleteUser(parent, args) {
      return Models.User.findByIdAndDelete(args.id);
    },

    /*
    +-------------------------------------------------------------+
    | UPDATE
    +-------------------------------------------------------------+
    */
    userUpdate: function () {
      var _userUpdate = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(parent, args, context) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return Models.User.findByIdAndUpdate({
                  _id: args.id
                }, {
                  Firstname: args.Firstname,
                  Email: args.Email,
                  Adress: args.Adress,
                  Phone: args.Phone,
                  Password: args.Password,
                  Lastname: args.Lastname,
                  IsAdmin: args.IsAdmin
                });

              case 3:
                return _context2.abrupt("return", Models.User.findById(args.id));

              case 6:
                _context2.prev = 6;
                _context2.t0 = _context2["catch"](0);
                console.log(_context2.t0);

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 6]]);
      }));

      function userUpdate(_x4, _x5, _x6) {
        return _userUpdate.apply(this, arguments);
      }

      return userUpdate;
    }(),

    /*
    +-------------------------------------------------------------+
    | SIGN UP
    +-------------------------------------------------------------+
    */
    signup: function () {
      var _signup = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(parent, args, context) {
        var User;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.t0 = Models.User;
                _context3.t1 = args.Firstname;
                _context3.t2 = args.Lastname;
                _context3.t3 = args.Phone;
                _context3.t4 = args.Adress;
                _context3.t5 = args.Email;
                _context3.next = 8;
                return _bcrypt["default"].hash(args.Password, 10);

              case 8:
                _context3.t6 = _context3.sent;
                _context3.t7 = args.IsAdmin;
                _context3.t8 = {
                  Firstname: _context3.t1,
                  Lastname: _context3.t2,
                  Phone: _context3.t3,
                  Adress: _context3.t4,
                  Email: _context3.t5,
                  Password: _context3.t6,
                  IsAdmin: _context3.t7
                };
                User = new _context3.t0(_context3.t8);
                _context3.next = 14;
                return User.save();

              case 14:
                console.log("Enregistrer"); // return json web token

                return _context3.abrupt("return", _jsonwebtoken["default"].sign({
                  Email: User.Email
                }, process.env.JWT_SECRET, {
                  expiresIn: "1y"
                }));

              case 16:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function signup(_x7, _x8, _x9) {
        return _signup.apply(this, arguments);
      }

      return signup;
    }()
  }
};
//# sourceMappingURL=user.resolver.js.map