import { FaLocationDot } from "react-icons/fa6";
import { BsCardText } from "react-icons/bs";
import { MdOutlinePayments } from "react-icons/md";
import { FaSackDollar } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { HiPencilAlt } from "react-icons/hi";
import Link from "next/link";
import Image from "next/image";

const categoryColorMap = {
  saving: "from-green-700 to-green-400",
  expense: "from-pink-800 to-pink-600",
  investment: "from-blue-700 to-blue-400",
  // Add more categories and corresponding color classes as needed
};

const Card = ({ cardType }: { cardType: string }) => {
  const cardClass = categoryColorMap[cardType as keyof typeof categoryColorMap];

  return (
    <div className={`rounded-md p-4 bg-gradient-to-br ${cardClass}`}>
      <div className="flex flex-col gap-3">
        <div className="flex flex-row items-center justify-between">
          <h2 className="text-lg font-bold text-white">Saving</h2>
          <div className="flex items-center gap-2">
            <FaTrash className={"cursor-pointer"} />
            <Link href={`/transaction/123`}>
              <HiPencilAlt className="cursor-pointer" size={20} />
            </Link>
          </div>
        </div>
        <p className="text-white flex items-center gap-1">
          <BsCardText />
          Description: Salary
        </p>
        <p className="text-white flex items-center gap-1">
          <MdOutlinePayments />
          Payment Type: Cash
        </p>
        <p className="text-white flex items-center gap-1">
          <FaSackDollar />
          Amount: $150
        </p>
        <p className="text-white flex items-center gap-1">
          <FaLocationDot />
          Location: New York
        </p>
        <div className="flex justify-between items-center">
          <p className="text-xs text-black font-bold">21 Sep, 2001</p>
          <Image src={"https://tecdn.b-cdn.net/img/new/avatars/2.webp"} alt="Avatar" width={40} height={40} className="h-8 w-8 border rounded-full" />
        </div>
      </div>
    </div>
  );
};
export default Card;
