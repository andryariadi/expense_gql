//GraphQL uses a schema that defines the Data Types and Operations available.

//The schema consists of types such as Query, Mutation, Subscription, and other custom types.

const userTypeDef = `#graphql
 type User {
    _id: ID!
    username: String!
    name: String!
    password: String!
    profilePicture: String
    gender: String!
 }   #This is a User type

 type Query {
    users: [User!]
    authUser: User
    user(userId: ID!): User
 } #This is a Operation type Query

 type Mutation {
    signup(input: SignUpInput!): User
    login(input: LoginInput!): User
    logout: LogoutResponse
 } #This is a Operation type Mutation

 input SignUpInput {
    username: String!
    name: String!
    password: String!
    gender: String!
 }

 input LoginInput {
    username: String!
    password: String!
 }

 type LogoutResponse {
    message: String!
 }
`;

export default userTypeDef;
