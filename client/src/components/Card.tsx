import { FaLocationDot } from "react-icons/fa6";
import { BsCardText } from "react-icons/bs";
import { MdOutlinePayments } from "react-icons/md";
import { FaSackDollar } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { HiPencilAlt } from "react-icons/hi";
import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/lib/utils";

type Transaction = {
  _id: string;
  description: string;
  category: "Cash" | "Card";
  paymentType: "Saving" | "Expense" | "Investment";
  amount: number;
  location: string;
  date: string;
};

const categoryColorMap = {
  Saving: "from-green-700 to-green-400",
  Expense: "from-pink-800 to-pink-600",
  Investment: "from-blue-700 to-blue-400",
  // Add more categories and corresponding color classes as needed
};

const Card = ({ cardType, transaction }: { cardType: string; transaction: Transaction }) => {
  const cardClass = categoryColorMap[cardType as keyof typeof categoryColorMap];

  const formatedDate = formatDate(transaction.date);

  console.log({ cardType, transaction, formatedDate }, "<---cardTypeTransaction");

  return (
    <div className={`rounded-md p-4 bg-gradient-to-br ${cardClass}`}>
      <div className="flex flex-col gap-3">
        <div className="flex flex-row items-center justify-between">
          <h2 className="text-lg font-bold text-white">{transaction.category}</h2>
          <div className="flex items-center gap-2">
            <FaTrash className={"cursor-pointer"} />
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
