import { useQuery } from "@apollo/client";
import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import LoadingPage from "../../components/LoadingPage";
import { useMe } from "../../libs/client/hooks/useMe";
import { fileToUrl } from "../../libs/client/utils";
import { FIND_RESTAURANT_BY_ID_QUERY } from "../../libs/server/queries/findRestaurantById.gql";
import {
  findRestaurantById,
  findRestaurantByIdVariables,
} from "../../libs/server/queries/__generated__/findRestaurantById";

const RestaurantDetail: NextPage = () => {
  const router = useRouter();
  const user = useMe();
  const {
    query: { id: restaurantId },
  } = router;

  const { data, loading } = useQuery<
    findRestaurantById,
    findRestaurantByIdVariables
  >(FIND_RESTAURANT_BY_ID_QUERY, {
    variables: {
      input: {
        restaurantId: +(restaurantId as string),
      },
    },
  });
  return (
    <Layout
      title={
        loading
          ? "loading"
          : data?.findRestaurantById.restaurant?.name || "Restaurant"
      }
    >
      {loading ? (
        <LoadingPage />
      ) : (
        <div>
          <div className="bg-gray-300 w-full h-72 relative">
            <Image
              src={fileToUrl({
                fileId: data?.findRestaurantById.restaurant?.coverImg as string,
                variant: "public",
              })}
              layout="fill"
              alt="cover img"
              className="absolute object-center z-0"
            />
          </div>
          <div className="w-full space-y-4 px-12 py-6">
            <span className="font-semibold text-xl">
              {data?.findRestaurantById.restaurant?.name}
            </span>
            <div className="flex space-x-5 items-center">
              <div
                onClick={() =>
                  router.push(
                    `/owner/${data?.findRestaurantById.restaurant?.id}/create-dish`
                  )
                }
                className="py-2 px-4 bg-gray-700 hover:bg-gray-800 rounded-sm text-white text-sm cursor-pointer"
              >
                Add Dish &rarr;
              </div>
              <div className="py-2 px-4 bg-green-600 hover:bg-green-700  rounded-sm text-white text-sm cursor-pointer">
                Buy Promotion &rarr;
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default RestaurantDetail;
