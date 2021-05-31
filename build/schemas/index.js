"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _product = _interopRequireDefault(require("./product.schema"));

var _order = _interopRequireDefault(require("./order.schema"));

var _user = _interopRequireDefault(require("./user.schema"));

var _categorie = _interopRequireDefault(require("./categorie.schema"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = [_user["default"], _product["default"], _order["default"], _categorie["default"]];
exports["default"] = _default;
//# sourceMappingURL=index.js.map