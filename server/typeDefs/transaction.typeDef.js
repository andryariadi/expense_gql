//GraphQL uses a schema that defines the Data Types and Operations available.

//The schema consists of types such as Query, Mutation, Subscription, and other custom types.

const transactionTypeDef = `#graphql
 type Transaction {
    _id: ID!
    userId: ID!
    description: String!
    paymentType: String!
    category: String!
    amount: Float!
    location: String
    date: String!
 } #This is a Transaction type

 type Query {
    transactions: [Transaction!]
    transaction(transactionId: ID!): Transaction
 } #This is a Operation type Query

 type Mutation {
    createTransaction(input: CreateTransactionInput!): Transaction!
    updateTransaction(input: UpdateTransactionInput!): Transaction!
    deleteTransaction(transactionId: ID!): Transaction!
 } #This is a Operation type Mutation

 input CreateTransactionInput {
    description: String!
    paymentType: String!
    category: String!
    amount: Float!
    location: String
    date: String!
 }

input UpdateTransactionInput {
    transactionId: ID!
    description: String
    paymentType: String
    category: String
    amount: Float
    location: String
    date: String
}
`;

export default transactionTypeDef;
