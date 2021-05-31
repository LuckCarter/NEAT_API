import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Model } from "mongoose";
import * as Models from "../models";
import utils from "../utils/utils";
module.exports = {
  Query: {
    users: (parent, args, context) => {
      // if (!context.req.isAuth) {
      //   throw new Error('Unauthenticated!');
      // }
      return Models.User.find();
    },
    user: (parent, args, context) => {
      // if (!context.req.isAuth) {
      //   throw new Error("Unauthenticated!");
      // }
      return Models.User.findById(args.id);
    },
    login: async (parent, args, context) => {
      // utils.IsAdmin(context.req);
    
      const User = await Models.User.find({ Email: args.Email });

      if (!User[0]) {
    
        throw new Error("Email is Incorrect");
      }
      const valid = await bcrypt.compareSync(args.Password, User[0].Password);
      if (!valid) {
        throw new Error("Incorrect password");
      }

      // return json web token
      const token = jwt.sign(
        { id: User[0]._id, Email: User[0].Email, IsAdmin: User[0].IsAdmin },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
      return token;
    },
  },
  Mutation: {
    deleteUser: (parent, args) => {
      return Models.User.findByIdAndDelete(args.id);
    },
    /*
    +-------------------------------------------------------------+
    | UPDATE
    +-------------------------------------------------------------+
    */
    userUpdate: async (parent, args, context) => {
      // if (!context.req.isAuth) {
      //   throw new Error('Unauthenticated!');
      // }
      try {
        await Models.User.findByIdAndUpdate(
          { _id: args.id },
          { 
          Firstname: args.Firstname,
          Email:args.Email,
          Adress:args.Adress,
          Phone:args.Phone,
          Password:args.Password,
          Lastname:args.Lastname,
          IsAdmin:args.IsAdmin
         }
        );
        return Models.User.findById(args.id);
      } catch (error) {
        console.log(error);
      }
    },
    /*
    +-------------------------------------------------------------+
    | SIGN UP
    +-------------------------------------------------------------+
    */
    signup: async (parent, args, context) => {
      const User = new Models.User({
        Firstname: args.Firstname,
        Lastname: args.Lastname,
        Phone: args.Phone,
        Adress: args.Adress,
        Email: args.Email,
        Password: await bcrypt.hash(args.Password, 10),
        IsAdmin: args.IsAdmin,
      });
      await User.save();
      console.log("Enregistrer");
      // return json web token
      return jwt.sign({ Email: User.Email }, process.env.JWT_SECRET, {
        expiresIn: "1y",
      });
    },
  },
};
