import CardLists from "@/components/CardLists";
import Chart from "@/components/Chart";
import HeaderHome from "@/components/HeaderHome";
import TransactionForm from "@/components/TransactionForm";
import { GET_TRANSACTION_STATISTICS } from "@/graphql/queries/transaction.query";
import { GET_AUTHENTICATED_USER, GET_USERS } from "@/graphql/queries/user.query";
import { query } from "@/libs/ApolloConfig";
// import { useQuery } from "@apollo/client";
// import { graphqlAxios } from "@/libs/graphqlAxios";

export default async function Home() {
  // fetch data in Server Component use Apollo Client
  const { data } = await query({
    query: GET_AUTHENTICATED_USER,
  }); // better to use query() instead of getClient() in Server Component

  // const client = await getClient();
  // const { data: user } = await client.query({
  //   query: GET_AUTHENTICATED_USER,
  // }); // if you use getClient()

  const { data: users } = await query({
    query: GET_USERS,
  });

  const { data: transactionStatistics } = await query({
    query: GET_TRANSACTION_STATISTICS,
  });

  // fetch data in Server Component use Axios
  // const data = await graphqlAxios(GET_AUTHENTICATED_USER);

  // fetch data in Client Component use Apollo Client
  // const { loading, data, error } = useQuery(GET_AUTHENTICATED_USER);
  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error.message}</p>;

  console.log({ data, users, transactionStatistics }, "<----homePageee");

  return (
    <main className="b-fuchsia-500 min-h-[calc(100vh-12rem)] flex  items-start justify-center">
      <div className="b-sky-500">
        <div className="b-rose-500 w-full max-w-5xl flex flex-col items-center gap-y-5">
          {/* Header */}
          <HeaderHome />

          {/* Chart and Form */}
          <div className="flex items-center gap-10">
            <Chart transactionStatistics={transactionStatistics} />

            <TransactionForm />
          </div>
        </div>

        {/* Card Lists */}
        <CardLists />
      </div>
    </main>
  );
}
