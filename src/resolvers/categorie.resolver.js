import * as Models from "../models";
module.exports = {
  Query: {
    categories: () => {
          return Models.Categorie.find().populate('Products');
    },
    categorie: (parent, args) => {
      return Models.Categorie.findById(args.id);
    },
    categoriesProductFilter: (parent, args) => {
      let regex = new RegExp(args.value, "i");
   
      return Models.Categorie.findById(args.id).populate({
        path:"Products",
   
        match: {
          $and: [{ $or: [{ Title: regex }, { Description: regex }] }],
        },
      }).exec();
    },
  },
  Mutation: {
    createCategorie: (parent, args) => {
      const newCategorie = new Models.Categorie({
        Title:args.Title,
        Products:args.Products
      });
      return newCategorie.save();
    },
    deleteCategorie: (parent, args) => {
      return Models.Categorie.findByIdAndDelete(args.id);
    },
    updateCategorie: async (parent, args, context) => {
      // if (!context.req.isAuth) {
      //   throw new Error('Unauthenticated!');
      // }
      try {
        await Models.Categorie.findByIdAndUpdate(
          { _id: args.id },
          { 
            Title:args.Title,
            Products:args.Products
         }
        );
        return Models.Categorie.findById(args.id).populate('Products');
      } catch (error) {
        console.log(error);
      }
    },
  },
};
