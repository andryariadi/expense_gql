import passport from "passport";
import User from "../models/user.model.js";
import { GraphQLLocalStrategy } from "graphql-passport";
import bcrypt from "bcryptjs";

export const configurePassport = async () => {
  // Serialize user: save user ID to session
  passport.serializeUser((user, done) => {
    console.log({ user, userId: user._id, done }, "<----passportSerializeUser");

    done(null, user._id); // property id name must be the same as in database
  });

  // Deserialize user: Retrieve the user from the session based on ID
  passport.deserializeUser(async (id, done) => {
    console.log({ id }, "<----passportDeserializeUser");
    try {
      const user = await User.findById(id);

      done(null, user);
    } catch (error) {
      console.log(error, "<----passportDeserializeUser");
      done(error);
    }
  });

  // Local authentication strategy (username and password)
  passport.use(
    new GraphQLLocalStrategy(async (username, password, done) => {
      try {
        const user = await User.findOne({ username });

        if (!user) throw new Error("Invalid username or password!");

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) throw new Error("Invalid username or password!");

        return done(null, user);
      } catch (error) {
        console.log(error, "<----passportGraphQLLocalStrategy");
        return done(error);
      }
    })
  );
};
