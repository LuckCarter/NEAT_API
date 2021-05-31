"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.array.find.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.promise.js");

require("core-js/modules/es.regexp.constructor.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.regexp.to-string.js");

require("regenerator-runtime/runtime.js");

var Models = _interopRequireWildcard(require("../models"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

module.exports = {
  Query: {
    categories: function categories() {
      return Models.Categorie.find().populate('Products');
    },
    categorie: function categorie(parent, args) {
      return Models.Categorie.findById(args.id);
    },
    categoriesProductFilter: function categoriesProductFilter(parent, args) {
      var regex = new RegExp(args.value, "i");
      return Models.Categorie.findById(args.id).populate({
        path: "Products",
        match: {
          $and: [{
            $or: [{
              Title: regex
            }, {
              Description: regex
            }]
          }]
        }
      }).exec();
    }
  },
  Mutation: {
    createCategorie: function createCategorie(parent, args) {
      var newCategorie = new Models.Categorie({
        Title: args.Title,
        Products: args.Products
      });
      return newCategorie.save();
    },
    deleteCategorie: function deleteCategorie(parent, args) {
      return Models.Categorie.findByIdAndDelete(args.id);
    },
    updateCategorie: function () {
      var _updateCategorie = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(parent, args, context) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return Models.Categorie.findByIdAndUpdate({
                  _id: args.id
                }, {
                  Title: args.Title,
                  Products: args.Products
                });

              case 3:
                return _context.abrupt("return", Models.Categorie.findById(args.id).populate('Products'));

              case 6:
                _context.prev = 6;
                _context.t0 = _context["catch"](0);
                console.log(_context.t0);

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 6]]);
      }));

      function updateCategorie(_x, _x2, _x3) {
        return _updateCategorie.apply(this, arguments);
      }

      return updateCategorie;
    }()
  }
};
//# sourceMappingURL=categorie.resolver.js.map