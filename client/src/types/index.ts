export interface Transaction {
  _id: string;
  description: string;
  paymentType: "Cash" | "Card";
  category: "Saving" | "Expense" | "Investment";
  amount: number;
  location: string;
  date: string;
}

// opsi one for chart data type
export interface TransactionStatistics {
  transactionStatistics: {
    categoryStatistics: {
      category: string;
      totalAmount: number;
    }[];
  };
}

// opsi two for chart data type
// interface CategoryStat {
//   category: string;
//   totalAmount: number;
// }

// interface TransactionStats {
//   categoryStatistics: CategoryStat[];
// }

// interface ChartProps {
//   transactionStatistics: TransactionStats;
// }

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
    borderRadius: number;
    spacing: number;
    cutout: number;
  }[];
}
