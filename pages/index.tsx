import { useQuery } from "@apollo/client";
import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import MainRestaurants from "../components/MainRestaurants";
import { fileToUrl } from "../libs/client/utils";
import { ALL_RESTAURANT_QUERY } from "../libs/server/queries/allRestaurants.gql";
import {
  allRestaurant,
  allRestaurantVariables,
} from "../libs/server/queries/__generated__/allRestaurant";

const Home: NextPage = () => {
  const router = useRouter();
  const { data } = useQuery<allRestaurant, allRestaurantVariables>(
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
      {data?.allRestaurant.result && (
        <MainRestaurants data={data?.allRestaurant.result} />
      )}
    </Layout>
  );
};

export default Home;
