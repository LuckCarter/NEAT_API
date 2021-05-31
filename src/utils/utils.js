import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as Models from "../models";
module.exports = {
  isAdmin: async (req) => {
    if (!req.userId) {
      throw new Error("Unauthenticated!");
    }
    const x = await Models.User.findById(req.userId);
    return x;
  },
};
