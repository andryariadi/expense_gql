import express from "express";
import http from "http";
import cors from "cors";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import passport from "passport";
import session from "express-session";
import connectMongo from "connect-mongodb-session";

import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { expressMiddleware } from "@apollo/server/express4";

import mergedTypeDefs from "./typeDefs/index.js";
import mergedResolvers from "./resolvers/index.js";
import connectToMongoDB from "./db/connectDB.js";
import { buildContext } from "graphql-passport";

dotenv.config();
const app = express();

const httpServer = http.createServer(app);

const MongoDBStore = connectMongo(session);

const store = new MongoDBStore({
  uri: process.env.MONGODB_URI,
  collection: "sessions",
});

store.on("erro", (err) => console.log(err));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false, // this option specifies whether to save the session to the store on every request
    saveUninitialized: false, // this option specifies whether to create a session for the user if one doesn't exist
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      httpOnly: true, // this option prevents the Cross-Site Scripting (XSS) attacks.
      //   secure: true, // this option specifies whether the cookie should only be sent over HTTPS, which is necessary for production environments
    },
    store: store,
  })
);

app.use(passport.initialize());
app.use(passport.session());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

const server = new ApolloServer({
  typeDefs: mergedTypeDefs,
  resolvers: mergedResolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start(); // Ensure we wait for our server to start

// Set up our Express middleware to handle CORS, body parsing and our expressMiddleware function.
app.use(
  "/graphql",
  cors({
    origin: "*",
    credentials: true,
  }),
  express.json(),
  // expressMiddleware accepts the same arguments:
  // an Apollo Server instance and optional configuration options
  expressMiddleware(server, {
    context: async ({ req, res }) => buildContext({ req, res }),
  })
);

// Modified server startup
await new Promise((resolve) => httpServer.listen({ port: 5000 }, resolve));
await connectToMongoDB();

console.log(`🚀 Server ready at http://localhost:5000/graphql`);

// setup without express.js
// const server = new ApolloServer({
//     typeDefs: mergedTypeDefs,
//     resolvers: mergedResolvers,
//   });

//   const { url } = await startStandaloneServer(server, {
//     listen: { port: 5000 },
//   });

//   console.log(`🚀 Server ready at ${url}`);
