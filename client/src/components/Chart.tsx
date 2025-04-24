"use client";

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
// import { TransactionStatistics } from "@/types";
import { useEffect, useState } from "react";
import { ChartData, TransactionStatistics } from "@/types";
ChartJS.register(ArcElement, Tooltip, Legend);

// Dummy data for the chart
// const chartData = {
//   labels: ["Saving", "Expense", "Investment"],
//   datasets: [
//     {
//       label: "%",
//       data: [13, 8, 3],
//       backgroundColor: ["rgba(75, 192, 192)", "rgba(255, 99, 132)", "rgba(54, 162, 235)"],
//       borderColor: ["rgba(75, 192, 192)", "rgba(255, 99, 132)", "rgba(54, 162, 235, 1)"],
//       borderWidth: 1,
//       borderRadius: 30,
//       spacing: 10,
//       cutout: 130,
//     },
//   ],
// };

const Chart = ({ transactionStatistics }: TransactionStatistics) => {
  const data = transactionStatistics.categoryStatistics;

  console.log(data, "<---chartData");

  // fetch data chart with useState and useEffect
  const [chartData, setChartData] = useState<ChartData>({
    labels: ["Saving", "Expense", "Investment"],
    datasets: [
      {
        label: "$",
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
        borderRadius: 30,
        spacing: 10,
        cutout: 130,
      },
    ],
  });

  useEffect(() => {
    if (data) {
      const categories = data.map((stat) => stat.category);
      const totalAmounts = data.map((stat) => stat.totalAmount);

      const backgroundColors: string[] = [];
      const borderColors: string[] = [];

      categories.forEach((category) => {
        if (category === "Saving") {
          backgroundColors.push("rgba(75, 192, 192)");
          borderColors.push("rgba(75, 192, 192)");
        } else if (category === "Expense") {
          backgroundColors.push("rgba(255, 99, 132)");
          borderColors.push("rgba(255, 99, 132)");
        } else if (category === "Investment") {
          backgroundColors.push("rgba(54, 162, 235)");
          borderColors.push("rgba(54, 162, 235)");
        }
      });

      setChartData((prev) => ({
        labels: categories,
        datasets: [
          {
            ...prev.datasets[0],
            data: totalAmounts,
            backgroundColor: backgroundColors,
            borderColor: borderColors,
          },
        ],
      }));
    }
  }, [data]);

  // fetch data chart without useEffect
  // const chartData = {
  //   labels: data.map((stat) => stat.category),
  //   datasets: [
  //     {
  //       label: "%",
  //       data: data.map((stat) => stat.totalAmount),
  //       backgroundColor: data.map((stat) => {
  //         switch (stat.category.toLowerCase()) {
  //           case "saving":
  //             return "rgba(75, 192, 192)";
  //           case "expense":
  //             return "rgba(255, 99, 132)";
  //           case "investment":
  //             return "rgba(54, 162, 235)";
  //           default:
  //             return "rgba(201, 203, 207)";
  //         }
  //       }),
  //       borderColor: data.map((stat) => {
  //         switch (stat.category.toLowerCase()) {
  //           case "saving":
  //             return "rgba(75, 192, 192)";
  //           case "expense":
  //             return "rgba(255, 99, 132)";
  //           case "investment":
  //             return "rgba(54, 162, 235)";
  //           default:
  //             return "rgba(201, 203, 207)";
  //         }
  //       }),
  //       borderWidth: 1,
  //       borderRadius: 30,
  //       spacing: 10,
  //       cutout: 130,
  //     },
  //   ],
  // };

  return (
    <div className="h-[330px] w-[330px] md:h-[360px] md:w-[360px]">
      <Doughnut data={chartData} />
    </div>
  );
};

export default Chart;
