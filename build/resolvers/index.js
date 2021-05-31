"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _product = _interopRequireDefault(require("./product.resolver"));

var _order = _interopRequireDefault(require("./order.resolver"));

var _user = _interopRequireDefault(require("./user.resolver"));

var _categorie = _interopRequireDefault(require("./categorie.resolver"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = [_user["default"], _order["default"], _product["default"], _categorie["default"]];
exports["default"] = _default;
//# sourceMappingURL=index.js.map