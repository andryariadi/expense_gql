import Transaction from "../models/transaction.model.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

const userResolver = {
  Query: {
    users: async () => {
      // resolver function (ex: users) that accepts four arguments: parent, args, context, and info
      try {
        const users = await User.find();

        return users;
      } catch (error) {
        console.log(error, "<----usersError");
        throw new Error(error.message || "Internal server error!");
      }
    }, // name of the query users must match the name of the query in the user.typeDef.js and Appolo client

    user: async (_, { userId }) => {
      try {
        const user = await User.findById(userId);

        return user;
      } catch (error) {
        console.log(error, "<----userError");
        throw new Error(error.message || "Internal server error!");
      }
    }, // args userId must match the name of the query in the user.typeDef.js and Appolo server

    authUser: async (_, ___, context) => {
      try {
        const user = await context.getUser();

        return user;
      } catch (error) {
        console.error(error, "<----authUserError");
        throw new Error("Internal server error");
      }
    },
  },

  Mutation: {
    signUp: async (_, { input }, context) => {
      console.log({ context }, "<---signupMutation");

      try {
        const { username, name, password, gender } = input;

        if (!username || !name || !password || !gender) throw new Error("All fields are required!");

        const existingUser = await User.findOne({ username });

        if (existingUser) throw new Error("User already exists!");

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
          username,
          name,
          password: hashedPassword,
          gender,
          profilePicture: gender === "male" ? boyProfilePic : girlProfilePic,
        });

        await newUser.save();

        await context.login(newUser);

        return newUser;
      } catch (error) {
        console.log(error, "<----signUpError");
        throw new Error(error.message || "Internal server error!");
      }
    },

    login: async (_, { input }, context) => {
      try {
        const { username, password } = input;

        if (!username || !password) throw new Error("All fields are required!");

        const { user } = await context.authenticate("graphql-local", { username, password });

        await context.login(user);

        return user;
      } catch (error) {
        console.log(error, "<----loginError");
        throw new Error(error.message || "Internal server error!");
      }
    },

    logout: async (_, __, context) => {
      try {
        await context.logout();

        context.req.session.destroy((err) => {
          if (err) throw err;
        });

        context.res.clearCookie("connect.sid");

        return { message: "Logged out successfully!" };
      } catch (error) {
        console.log(error, "<----logoutError");
        throw new Error(error.message || "Internal server error!");
      }
    },
  },

  // this is the User type to get transactions that have a relationship to the user.
  User: {
    transactions: async (parent) => {
      console.log({ parent }, "<---userTransactions");

      try {
        const transactions = await Transaction.find({ userId: parent._id });

        return transactions;
      } catch (error) {
        console.log(error, "<----userTransactionsError");
        throw new Error(error.message || "Internal server error!");
      }
    },
  },
};

export default userResolver;
