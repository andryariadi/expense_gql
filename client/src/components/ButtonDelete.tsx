"use client";

import { deleteTransactionAction } from "@/actions/transaction.action";
import { toastStyle } from "@/lib/utils";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa6";
import { TbLoader } from "react-icons/tb";

const ButtonDelete = ({ transactionId }: { transactionId: string }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await deleteTransactionAction(transactionId);

      console.log({ res }, "<---deleteTransaction");

      if (res.data) {
        toast.success("Transaction deleted successfully", {
          style: toastStyle,
        });
      }

      setLoading(false);
    } catch (error) {
      console.log(error, "<----errorTransactionForm");
      const errorMessage = error instanceof Error ? error.message : "Something went wrong";

      toast.error(errorMessage, {
        style: toastStyle,
      });
    }
  };
  return <>{loading ? <TbLoader scale={22} className="animate-spin mx-auto" /> : <FaTrash className="cursor-pointer" onClick={handleDelete} />}</>;
};

export default ButtonDelete;
