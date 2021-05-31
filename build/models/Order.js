"use strict";

require("core-js/modules/es.number.constructor.js");

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var orderSchema = new Schema({
  AmountTotal: Number,
  User: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  Products: [{
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }],
  Statut: {
    type: String
  }
}, {
  timestamps: true
});
module.exports = mongoose.model('Order', orderSchema);
//# sourceMappingURL=Order.js.map