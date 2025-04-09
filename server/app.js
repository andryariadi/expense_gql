import express from "express"; // Framework for creating a web server
import http from "http"; // HTTP module for creating a server
import cors from "cors"; // Middleware to enable Cross-Origin Resource Sharing (CORS)
import rateLimit from "express-rate-limit"; // Middleware to limit the number of requests from a single IP
import dotenv from "dotenv"; // Module to manage environment variables
import passport from "passport"; // Library for authentication
import session from "express-session"; // Middleware to manage sessions
import connectMongo from "connect-mongodb-session"; // Library to store sessions in MongoDB

// Import Apollo Server modules for GraphQL
import { ApolloServer } from "@apollo/server"; // Library to create a GraphQL server
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer"; // Plugin to stop the HTTP server when Apollo Server is shut down
import { expressMiddleware } from "@apollo/server/express4"; // Middleware to integrate Apollo Server with Express.js

// Import GraphQL type definitions and resolvers
import mergedTypeDefs from "./typeDefs/index.js"; // Combined GraphQL type definitions
import mergedResolvers from "./resolvers/index.js"; // Combined GraphQL resolvers

// Import function to connect to MongoDB
import connectToMongoDB from "./db/connectDB.js"; // Function to connect the application to MongoDB

// Import function to build GraphQL context with Passport.js
import { buildContext } from "graphql-passport"; // Function to create a GraphQL context containing request and response

// Import function to configure Passport.js
import { configurePassport } from "./passport/passport.config.js"; // Function to set up Passport.js authentication strategies

// Load environment variables from the .env file
dotenv.config();

// Configure Passport.js for authentication
configurePassport();

// Create an instance of Express.js
const app = express();

// Create an HTTP server using Express.js
const httpServer = http.createServer(app);

// Create a store to save sessions in MongoDB
const MongoDBStore = connectMongo(session);

// Configure the session store
const store = new MongoDBStore({
  uri: process.env.MONGODB_URI, // MongoDB URI from environment variables
  collection: "sessions", // Collection name for storing sessions
});

// Handle errors when saving sessions
store.on("error", (err) => console.log(err));

// Use middleware for session management
app.use(
  session({
    secret: process.env.SESSION_SECRET, // Secret key to encrypt sessions
    resave: false, // Do not save the session to the store if there are no changes
    saveUninitialized: false, // Do not create a session for users who are not logged in
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // Session duration: 1 week
      httpOnly: true, // Prevent cookie access via JavaScript (prevents XSS attacks)
      secure: process.env.NODE_ENV === "production", // Set to true to only send cookies over HTTPS (enabled in production)
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", // SameSite attribute for cookies (set to "none" in production for cross-origin requests)
    },
    store: store, // Store sessions in MongoDB
  })
);

// Initialize Passport.js
app.use(passport.initialize());

// Enable session-based authentication with Passport.js
app.use(passport.session());

// app.use((req, res, next) => {
//   console.log(`Request from: ${req.ip} - ${req.method} ${req.url}`);
//   next();
// });

// Set up rate limiting to restrict the number of requests from a single IP
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // Time window: 15 minutes
//   max: 100, // Maximum of 100 requests per IP within the time window
// });
// app.use(limiter);

// Create an instance of Apollo Server
const server = new ApolloServer({
  typeDefs: mergedTypeDefs, // GraphQL type definitions
  resolvers: mergedResolvers, // GraphQL resolvers
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })], // Plugin to stop the HTTP server when Apollo Server is shut down
});

// Wait for Apollo Server to start
await server.start();

// Set up middleware for the GraphQL endpoint
app.use(
  "/graphql", // Path for the GraphQL endpoint
  cors({
    origin: "http://localhost:3000", // Allow requests from this origin (frontend application)
    credentials: true, // Allow sending credentials (cookies, session)
  }),
  express.json(), // Middleware to parse JSON request bodies
  // Middleware to integrate Apollo Server with Express.js
  expressMiddleware(server, {
    // Build the GraphQL context containing request and response
    context: async ({ req, res }) => buildContext({ req, res }),
  })
);

// Wait for the HTTP server to listen on port 5000
await new Promise((resolve) => httpServer.listen({ port: 5000 }, resolve));

// Connect the application to MongoDB
await connectToMongoDB();

// Display a message indicating that the server is ready
console.log(`🚀 Server ready at http://localhost:5000/graphql`);

// Example setup for Apollo Server without Express.js (optional)
// const server = new ApolloServer({
//     typeDefs: mergedTypeDefs,
//     resolvers: mergedResolvers,
//   });

//   const { url } = await startStandaloneServer(server, {
//     listen: { port: 5000 },
//   });

//   console.log(`🚀 Server ready at ${url}`);
