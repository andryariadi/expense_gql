export interface Transaction {
  _id: string;
  description: string;
  paymentType: "Cash" | "Card";
  category: "Saving" | "Expense" | "Investment";
  amount: number;
  location: string;
  date: string;
}
