import { useQuery } from "@apollo/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import MainRestaurants from "../../components/MainRestaurants";
import { SEARCH_RESTAURANTS_QUERY } from "../../libs/server/queries/searchRestaurants.gql";
import {
  searchRestaurants,
  searchRestaurantsVariables,
} from "../../libs/server/queries/__generated__/searchRestaurants";

const Search: NextPage = () => {
  const router = useRouter();
  if (!router.query.keyword) {
    router.replace("/");
  }
  const { data, loading } = useQuery<
    searchRestaurants,
    searchRestaurantsVariables
  >(SEARCH_RESTAURANTS_QUERY, {
    variables: {
      input: {
        page: 1,
        keyword: router.query.keyword as string,
      },
    },
  });
  console.log(data);
  return (
    <Layout
      title={router.query.keyword ? (router.query.keyword as string) : "Error"}
    >
      {loading ? (
        <div>loading...</div>
      ) : (
        <MainRestaurants data={data?.searchRestaurants.result} />
      )}
    </Layout>
  );
};

export default Search;
