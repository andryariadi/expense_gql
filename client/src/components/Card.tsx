// "use client";

import { FaLocationDot } from "react-icons/fa6";
import { BsCardText } from "react-icons/bs";
import { MdOutlinePayments } from "react-icons/md";
import { FaSackDollar } from "react-icons/fa6";
import { HiPencilAlt } from "react-icons/hi";
import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/lib/utils";
// import { FaTrash } from "react-icons/fa";
// import toast from "react-hot-toast";
// import { TbLoader } from "react-icons/tb";
// import { useMutation } from "@apollo/client";
// import { DELETE_TRANSACTION } from "@/graphql/mutations/transaction.mutation";
// import { useRouter } from "next/navigation";
import ButtonDelete from "./ButtonDelete";
import { Transaction } from "@/types";

const categoryColorMap = {
  Saving: "from-green-700 to-green-400",
  Expense: "from-pink-800 to-pink-600",
  Investment: "from-blue-700 to-blue-400",
  // Add more categories and corresponding color classes as needed
};

const Card = ({ cardType, transaction }: { cardType: string; transaction: Transaction }) => {
  const cardClass = categoryColorMap[cardType as keyof typeof categoryColorMap];

  const formatedDate = formatDate(transaction.date);

  // const router = useRouter();
  // const [deleteTransaction, { loading }] = useMutation(DELETE_TRANSACTION, {
  //   // refetchQueries: ["GetTransactions"], // how to update client-side rendered data in real time

  //   // how to update server-side rendered data in real time
  //   onCompleted: () => {
  //     // window.location.reload(); // it works but we see the page refreshed
  //     router.refresh(); // this is the best way to refresh the page without reloading
  //   },
  // });

  // // use this function if you want the component to be rendered on the client side
  // const handleDelete = async () => {
  //   try {
  //     const res = await deleteTransaction({
  //       variables: {
  //         transactionId: transaction._id,
  //       },
  //     });

  //     console.log({ res }, "<---deleteTransaction");

  //     if (res.data) {
  //       toast.success("Transaction deleted successfully", {
  //         style: toastStyle,
  //       });
  //     }
  //   } catch (error) {
  //     console.log(error, "<----errorTransactionForm");
  //     const errorMessage = error instanceof Error ? error.message : "Something went wrong";

  //     toast.error(errorMessage, {
  //       style: toastStyle,
  //     });
  //   }
  // };

  // console.log({ cardType, transaction, formatedDate }, "<---cardTypeTransaction");

  return (
    <div className={`rounded-md p-4 bg-gradient-to-br ${cardClass}`}>
      <div className="flex flex-col gap-3">
        <div className="flex flex-row items-center justify-between">
          <h2 className="text-lg font-bold text-white">{transaction.category}</h2>
          <div className="flex items-center gap-2">
            {/* Button Delete */}

            {/* If you use this button delete, the component will be rendered on the client side */}
            {/* {loading ? <TbLoader scale={22} className="animate-spin mx-auto" /> : <FaTrash className={"cursor-pointer"} onClick={handleDelete} />} */}

            {/* If you use this button delete, the component will be rendered on the server side */}
            <ButtonDelete transactionId={transaction._id} />

            {/* Button Edit */}
            <Link href={`/transaction/${transaction._id}`} className="flex items-center gap-2">
              <HiPencilAlt className="cursor-pointer" size={20} />
            </Link>
          </div>
        </div>
        <p className="text-white flex items-center gap-1">
          <BsCardText />
          Description: {transaction.description}
        </p>
        <p className="text-white flex items-center gap-1">
          <MdOutlinePayments />
          Payment Type: {transaction.paymentType}
        </p>
        <p className="text-white flex items-center gap-1">
          <FaSackDollar />
          Amount: ${transaction.amount}
        </p>
        <p className="text-white flex items-center gap-1">
          <FaLocationDot />
          Location: {transaction.location || "N/A"}
        </p>

        <div className="flex justify-between items-center">
          <p className="text-xs text-black font-bold">{formatedDate}</p>
          <Image src={"https://tecdn.b-cdn.net/img/new/avatars/2.webp"} alt="Avatar" width={40} height={40} className="h-8 w-8 border rounded-full" />
        </div>
      </div>
    </div>
  );
};
export default Card;
