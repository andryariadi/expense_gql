import express from "express";
import http from "http";
import cors from "cors";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";

import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { expressMiddleware } from "@apollo/server/express4";

import mergedTypeDefs from "./typeDefs/index.js";
import mergedResolvers from "./resolvers/index.js";
import connectToMongoDB from "./db/connectDB.js";

dotenv.config();
const app = express();

const httpServer = http.createServer(app);

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
    context: async ({ req }) => ({ req }),
  })
);

// Modified server startup
await new Promise((resolve) => httpServer.listen({ port: 5000 }, resolve));
await connectToMongoDB();

console.log(`🚀 Server ready at http://localhost:5000/graphql`);

// without express.js
// const server = new ApolloServer({
//     typeDefs: mergedTypeDefs,
//     resolvers: mergedResolvers,
//   });

//   const { url } = await startStandaloneServer(server, {
//     listen: { port: 5000 },
//   });

//   console.log(`🚀 Server ready at ${url}`);
