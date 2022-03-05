import { useQuery } from "@apollo/client";
import type { NextPage } from "next";
import Layout from "../components/Layout";
import LoadingPage from "../components/LoadingPage";
import MainRestaurants from "../components/MainRestaurants";
import { ALL_RESTAURANT_QUERY } from "../libs/server/queries/allRestaurants.gql";
import {
  allRestaurant,
  allRestaurantVariables,
} from "../libs/server/queries/__generated__/allRestaurant";

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
      {loading ? (
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
