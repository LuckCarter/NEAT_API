"use strict";

require("core-js/modules/es.number.constructor.js");

var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var productSchema = new Schema({
  Title: {
    type: String,
    required: true
  },
  Price: {
    type: Number,
    required: true
  },
  Url: {
    type: String,
    required: true
  },
  Description: {
    type: String
  }
}, {
  timestamps: true
});
module.exports = mongoose.model("Product", productSchema);
//# sourceMappingURL=Product.js.map