import { useQuery } from "@apollo/client";
import type { NextPage } from "next";
import Layout from "../components/Layout";
import LoadingPage from "../components/LoadingPage";
import MainRestaurants from "../components/MainRestaurants";
import { isLoggedInVar } from "../libs/client/apollo";
import { ALL_RESTAURANT_QUERY } from "../libs/server/queries/allRestaurants.gql";
import {
  allRestaurant,
  allRestaurantVariables,
} from "../libs/server/queries/__generated__/allRestaurant";
import Food from "../svgs/Food.svg";

const Home: NextPage = () => {
  const { data, loading } = useQuery<allRestaurant, allRestaurantVariables>(
    ALL_RESTAURANT_QUERY,
    {
      variables: {
        input: {
          page: 1,
        },
      },
    }
  );
  return (
    <Layout title="Home">
      {!isLoggedInVar() ? (
        <div className="w-full py-20 flex flex-col justify-center items-center space-y-3">
          <Food />
          <span className="font-semibold">Please try again after sign in.</span>
        </div>
      ) : loading ? (
        <LoadingPage />
      ) : (
        data?.allRestaurant.result && (
          <MainRestaurants data={data?.allRestaurant.result} />
        )
      )}
    </Layout>
  );
};

export default Home;
