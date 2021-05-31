"use strict";

var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var userSchema = new Schema({
  Firstname: {
    type: String,
    required: true
  },
  Lastname: {
    type: String,
    required: true
  },
  Phone: {
    type: String
  },
  Adress: {
    type: String
  },
  Email: {
    type: String,
    unique: true,
    required: true
  },
  Password: {
    type: String,
    required: true
  },
  IsAdmin: {
    type: Boolean
  }
}, {
  timestamps: true
});
module.exports = mongoose.model("User", userSchema);
//# sourceMappingURL=User.js.map