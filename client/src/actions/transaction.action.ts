"use server";

import { revalidatePath } from "next/cache";
import { CREATE_TRANSACTION } from "@/graphql/mutations/transaction.mutation";
import { getClient } from "@/libs/ApolloConfig";

export async function createTransactionAction(inputData: Record<string, string | number | boolean | Date>) {
  const client = getClient();

  try {
    const res = (await client).mutate({
      mutation: CREATE_TRANSACTION,
      variables: {
        input: inputData,
      },
    });

    const data = await res;

    console.log({ data }, "<---resTransactionAction");

    revalidatePath("/");
    return { success: true, data: data.data.createTransaction };
  } catch (error) {
    return { success: false, error };
  }
}
