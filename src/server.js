
require('dotenv').config();
import { ApolloServer, gql } from "apollo-server-express";
import express from "express";
import mongoose from "mongoose";
import typeDefs from "./schemas";
import resolvers from "./resolvers";
import * as Config from "./configs";
import cors from "cors";
import Auth from "./middleware/Auth";
const sgMail = require('@sendgrid/mail')
const startServer = async () => {
  const app = express();
  const stripe = require("stripe")("sk_test_51IdKa0EWLULmTbAKV5JLEAXK4XalxwTWVRVYc9nl2bUEeHLnvZ8IFXnuxUdNjtVT0nktMU79VVeuDsSHE58KO5nF00Bjcw0zFE");
  app.use(express.static("."));
  app.use(express.json());

 app.use(cors())
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context:({req,res,next}) => {return {req,res,next}}
  });
  app.use(Auth);
  server.applyMiddleware({ app });


  app.get("/", async (req, res) => {
    
    res.send("API WORKING");
  });
  app.post("/create-payment-intent", async (req, res) => {
    const { Price,receipt_email } = req.body;

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round((Price*100)),
      currency: "usd"

    });
    console.log(receipt_email)
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
      to: receipt_email, // Change to your recipient
      from: "regis.grumberg@gmail.com", // Change to your verified sender
      subject: 'Achat Fullstack gql',
      text: `Achat fait sur une app de test au prix de ${Price}€`,
      html: `<strong>Achat fait sur une app de test au prix de ${Price}€</strong>`,
    }
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent')
      })
      .catch((error) => {
        console.error(error)
      })
    res.send({
      clientSecret: paymentIntent.client_secret
    });

  });

  await mongoose
    .connect(Config.db.url, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify:true
    })
    .then(() => {
      console.log("Successfully connect to database");
    })
    .catch((err) => {
      console.log('couldn"t not connect to database', err);
      process.exit(-1);
    });

  app.listen({ port: process.env.PORT }, (e) =>
    console.log(
      `🚀 GraphQl ready at http://localhost:${process.env.PORT}${server.graphqlPath}`
    )
  );
};

startServer();
// require('dotenv').config()
// const app = require("./services/server.service");
// const mongoService = require("./services/mongoose.service");

// mongoService.dbConnect();
// app.start();