import { users } from "../dummyData/data.js";

const userResolver = {
  Query: {
    users: () => {
      return users;
    }, // name of the query users must match the name of the query in the user.typeDef.js and Appolo server
    user: (_, { userId }) => {
      return users.find((user) => userId === user._id);
    }, // args userId must match the name of the query in the user.typeDef.js and Appolo server
  },

  Mutation: {},
};

export default userResolver;
