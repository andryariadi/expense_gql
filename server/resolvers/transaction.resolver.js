import Transaction from "../models/transaction.model.js";

const transactionResolver = {
  Query: {
    transactions: async (_, __, context) => {
      // console.log({ context }, "<----transactionQuery");

      try {
        if (!context.getUser()) throw new Error("Unauthorized!");

        const userId = await context.getUser()._id;

        const transactions = await Transaction.find({ userId });

        return transactions;
      } catch (error) {
        console.log(error, "<----errorTransactions");
        throw new Error(error.message || "Internal server error!");
      }
    },

    transaction: async (_, { transactionId }) => {
      try {
        const transaction = await Transaction.findById(transactionId);

        return transaction;
      } catch (error) {
        console.log(error, "<----errorTransaction");
        throw new Error(error.message || "Internal server error!");
      }
    },
  },

  Mutation: {
    createTransaction: async (_, { input }, context) => {
      try {
        const newTransaction = new Transaction({
          ...input,
          userId: context.getUser()._id,
        });

        await newTransaction.save();

        return newTransaction;
      } catch (error) {
        console.log(error, "<----errorCreateTransaction");
        throw new Error(error.message || "Internal server error!");
      }
    },

    updateTransaction: async (_, { input }) => {
      try {
        const updateTransaction = await Transaction.findByIdAndUpdate(input.transactionId, input, { new: true });

        return updateTransaction;
      } catch (error) {
        console.log(error, "<----errorUpdateTransaction");
        throw new Error(error.message || "Internal server error!");
      }
    },

    deleteTransaction: async (_, { transactionId }) => {
      try {
        const deletedTransaction = await Transaction.findByIdAndDelete(transactionId);

        return deletedTransaction;
      } catch (error) {
        console.log(error, "<----errorDeleteTransaction");
        throw new Error(error.message || "Internal server error!");
      }
    },
  },
};

export default transactionResolver;
