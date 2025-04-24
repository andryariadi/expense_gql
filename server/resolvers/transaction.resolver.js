import Transaction from "../models/transaction.model.js";

const transactionResolver = {
  Query: {
    transactions: async (_, __, context) => {
      // console.log({ context }, "<----transactionQuery");

      try {
        if (!context.getUser()) throw new Error("Unauthorized!");

        const userId = await context.getUser()._id;

        const transactions = await Transaction.find({ userId }).sort({ createdAt: -1 });

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

    categoryStatistics: async (_, __, context) => {
      // console.log({ context }, "<----transactionQuery");

      try {
        if (!context.getUser()) throw new Error("Unauthorized!");

        const userId = await context.getUser()._id;

        const transactions = await Transaction.find({ userId }).sort({ createdAt: -1 });

        // const transactions = [
        // 	{ category: "expense", amount: 50 },
        // 	{ category: "expense", amount: 75 },
        // 	{ category: "investment", amount: 100 },
        // 	{ category: "saving", amount: 30 },
        // 	{ category: "saving", amount: 20 }
        // ];

        const categoryMap = {};

        transactions.forEach((transaction) => {
          const { category, amount } = transaction;
          if (!categoryMap[category]) {
            categoryMap[category] = 0;
          }
          categoryMap[category] += amount;
        });

        // categoryMap = { expense: 125, investment: 100, saving: 50 }

        const categoryStatistics = Object.entries(categoryMap).map(([category, totalAmount]) => ({ category, totalAmount }));

        return categoryStatistics;

        // [
        //   { category: "expense", totalAmount: 125 },
        //   { category: "investment", totalAmount: 100 },
        //   { category: "saving", totalAmount: 50 },
        // ];
      } catch (error) {
        console.log(error, "<----errorCategoryStatistics");
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
