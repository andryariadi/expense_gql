// "use client";

import { query } from "@/libs/ApolloConfig";
import Card from "./Card";
import { GET_TRANSACTIONS } from "@/graphql/queries/transaction.query";
import { Transaction } from "@/types";
// import { useQuery } from "@apollo/client";

const CardLists = async () => {
  const { data, loading, error } = await query({
    query: GET_TRANSACTIONS,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  console.log({ loading, error, data }, "<---CardListsData");

  // fetch data in Client Component use Apollo Client
  // const { loading, data, error } = useQuery(GET_TRANSACTIONS);
  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="w-full px-10 min-h-[40vh]">
      <h3 className="text-5xl font-bold text-center my-10">History</h3>

      {/* Card Lists */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start mb-20">
        {!loading && data.transactions.map((transaction: Transaction) => <Card key={transaction._id} transaction={transaction} cardType={transaction.category} />)}

        {data.transactions.length === 0 && (
          <div className="col-span-3 text-center">
            <p className="text-xl font-bold text-gray-500">No transactions found</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default CardLists;
