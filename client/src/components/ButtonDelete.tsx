"use client";

import { deleteTransactionAction } from "@/actions/transaction.action";
import { toastStyle } from "@/lib/utils";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa6";

const ButtonDelete = ({ transactionId }: { transactionId: string }) => {
  const handleDelete = async () => {
    try {
      const res = await deleteTransactionAction(transactionId);

      console.log({ res }, "<---deleteTransaction");

      if (res.data) {
        toast.success("Transaction deleted successfully", {
          style: toastStyle,
        });
      }
    } catch (error) {
      console.log(error, "<----errorTransactionForm");
      const errorMessage = error instanceof Error ? error.message : "Something went wrong";

      toast.error(errorMessage, {
        style: toastStyle,
      });
    }
  };
  return <FaTrash className={"cursor-pointer"} onClick={handleDelete} />;
};

export default ButtonDelete;
