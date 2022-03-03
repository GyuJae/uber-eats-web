import { useQuery } from "@apollo/client";
import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
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
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 space-y-6">
        {data?.allRestaurant.result &&
          data?.allRestaurant.result.map((restaurant) => (
            <div
              key={restaurant.id}
              className="space-y-2 cursor-pointer"
              onClick={() => router.push(`/restaurants/${restaurant.id}`)}
            >
              <div className="relative w-full h-64 md:h-60 lg:h-56 xl:h-52">
                <Image
                  src={fileToUrl({
                    fileId: restaurant.coverImg,
                    variant: "public",
                  })}
                  className="h-64 md:h-60 lg:h-56 xl:h-52  bg-gray-400 rounded-md "
                  layout="fill"
                  alt="preview photo"
                />
              </div>
              <div className="flex flex-col">
                <span>{restaurant.name}</span>
                <span className="text-gray-500 text-sm">
                  {restaurant.address}
                </span>
              </div>
            </div>
          ))}
      </div>
    </Layout>
  );
};

export default Home;
