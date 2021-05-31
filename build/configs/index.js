"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "db", {
  enumerable: true,
  get: function get() {
    return _db["default"];
  }
});
Object.defineProperty(exports, "jwt", {
  enumerable: true,
  get: function get() {
    return _jwt["default"];
  }
});
Object.defineProperty(exports, "server", {
  enumerable: true,
  get: function get() {
    return _server["default"];
  }
});

var _db = _interopRequireDefault(require("./db.config"));

var _jwt = _interopRequireDefault(require("./jwt.config"));

var _server = _interopRequireDefault(require("./server.config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
//# sourceMappingURL=index.js.map