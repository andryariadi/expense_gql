import { GiTakeMyMoney } from "react-icons/gi";
import { MdCreditCard } from "react-icons/md";
import { FaPiggyBank } from "react-icons/fa6";
import { GiPayMoney } from "react-icons/gi";
import { GiReceiveMoney } from "react-icons/gi";

export const PaymentType = [
  {
    name: "Cash",
    icon: GiTakeMyMoney,
  },
  {
    name: "Card",
    icon: MdCreditCard,
  },
];

export const Category = [
  {
    name: "Saving",
    icon: FaPiggyBank,
  },
  {
    name: "Expense",
    icon: GiPayMoney,
  },
  {
    name: "Investment",
    icon: GiReceiveMoney,
  },
];
