import * as Models from "../models";
module.exports = {
  Query: {
    orders: () => {
          return Models.Order.find().populate('Products').populate('User');
    },
    order: (parent, args) => {
      return Models.Order.findById(args.id);
    },
    orderUser: (parent, args, context)=> {
      return Models.Order.find({User:args.id}).populate('Products').populate('User');
  },
  },
  Mutation: {
    deleteOrder: (parent, args) => {
      return Models.Order.findByIdAndDelete(args.id);
    },
    createOrder: (parent, args) => {
      const newOrder = new Models.Order({
        AmountTotal: args.AmountTotal,
        User: args.User,
        Products: args.Products,
        Statut: args.Statut
      });
      return newOrder.save();
    },
    updateOrder: async (parent, args, context) => {
      try {
        const Order = await Models.Order.findByIdAndUpdate(
          { _id: args.id },
          {
            Statut: args.Statut,
          }
        );
        return Order;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
