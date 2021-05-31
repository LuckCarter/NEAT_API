import * as Models from "../models";
module.exports = {
  Query: {
    products: () => {
      return Models.Product.find();
    },
    productsFilter: (parent, args) => {
      let regex = new RegExp(args.value, "i");
      return Models.Product.find({
        $and: [{ $or: [{ Title: regex }, { Description: regex }] }],
      });
    },
    productsByArray: (parent, args) => {
      return Models.Product.find({
        _id: { $in: args.array },
      });
    },
    product: (parent, args) => {
      return Models.Product.findById(args.id);
    },
  },
  Mutation: {
    createProduct: (parent, args) => {
      const newProduct = new Models.Product({
        Title: args.Title,
        Price: args.Price,
        Url: args.Url,
        Description: args.Description,
      });
      return newProduct.save();
    },
    deleteProduct: (parent, args) => {
      return Models.Product.findByIdAndDelete(args.id);
    },
    updateProduct: async (parent, args, context) => {
      try {
        const Product = await Models.Product.findByIdAndUpdate(
          { _id: args.id },
          {
            Title: args.Title,
            Price: args.Price,
            Description: args.Description,
            Url: args.Url,
          }
        );
        return Product;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
