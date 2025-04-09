import CardLists from "@/components/CardLists";
import Chart from "@/components/Chart";
import TransactionForm from "@/components/TransactionForm";
import { GET_AUTHENTICATED_USER, GET_USERS } from "@/graphql/queries/user.query";
import { getClient } from "@/libs/ApolloConfig";
// import { useQuery } from "@apollo/client";
// import { graphqlAxios } from "@/libs/graphqlAxios";

export default async function Home() {
  // fetch data in Server Component use Apollo Client
  const { data } = await getClient().query({
    query: GET_USERS,
  });

  // fetch data in Server Component use Axios
  // const data = await graphqlAxios(GET_AUTHENTICATED_USER);

  // fetch data in Client Component use Apollo Client
  // const { loading, data, error } = useQuery(GET_AUTHENTICATED_USER);
  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error.message}</p>;

  console.log({ data }, "<----homePageee");

  return (
    <main className="b-fuchsia-500 min-h-[calc(100vh-12rem)] flex  items-start justify-center">
      <div className="b-sky-500">
        <div className="b-rose-500 w-full max-w-5xl flex flex-col items-center gap-y-5">
          {/* Title */}
          <h2 className="md:text-4xl text-2xl lg:text-4xl font-bold text-center relative z-50 mb-4 mr-4 bg-gradient-to-r from-pink-600 via-indigo-500 to-pink-400 inline-block text-transparent bg-clip-text">Spend wisely, track wisely</h2>

          {/* Chart and Form */}
          <div className="flex items-center gap-10">
            <Chart />

            <TransactionForm />
          </div>
        </div>

        {/* Card Lists */}
        <CardLists />
      </div>
    </main>
  );
}
