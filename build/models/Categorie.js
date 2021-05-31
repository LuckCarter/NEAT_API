"use strict";

var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var categorieSchema = new Schema({
  Title: {
    type: String,
    required: true
  },
  Products: [{
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }]
}, {
  timestamps: true
});
module.exports = mongoose.model("Categorie", categorieSchema);
//# sourceMappingURL=Categorie.js.map