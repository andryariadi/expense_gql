"use server";

import { revalidatePath } from "next/cache";
import { CREATE_TRANSACTION, DELETE_TRANSACTION, UPDATE_TRANSACTION } from "@/graphql/mutations/transaction.mutation";
import { getClient } from "@/libs/ApolloConfig";
import { z } from "zod";
import { TransactionFormValidation } from "@/libs/validations";

export async function createTransactionAction(inputData: Record<string, unknown>) {
  try {
    // Wait for the client to resolve first
    const client = await getClient();

    const { data } = await client.mutate({
      mutation: CREATE_TRANSACTION,
      variables: { input: inputData },
    });

    revalidatePath("/");

    return { success: true, data: data.createTransaction };
  } catch (error) {
    console.error("Transaction action error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function updateTransactionAction(transactionId: string, inputData: z.infer<typeof TransactionFormValidation>) {
  try {
    const client = await getClient();

    const payload = {
      ...inputData,
      transactionId,
    };

    const { data } = await client.mutate({
      mutation: UPDATE_TRANSACTION,
      variables: { input: payload },
    });

    revalidatePath("/");

    return {
      success: true,
      data: data.updateTransaction,
      message: "Transaction updated successfully",
    };
  } catch (error) {
    console.error("Update transaction action error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      message: "Failed to update transaction",
    };
  }
}

export async function deleteTransactionAction(transactionId: string) {
  try {
    // Wait for the client to resolve first
    const client = await getClient();

    const { data } = await client.mutate({
      mutation: DELETE_TRANSACTION,
      variables: { transactionId: transactionId },
    });

    console.log({ data }, "<---deleteTransactionAction");

    revalidatePath("/");

    return { success: true, data: data.deleteTransaction };
  } catch (error) {
    console.error("Transaction action error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
