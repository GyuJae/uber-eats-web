import { useQuery } from "@apollo/client";
import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import Layout from "@components/Layout";
import LoadingPage from "@components/LoadingPage";
import { useMe } from "@libs/client/hooks/useMe";
import { fileToUrl } from "@libs/client/utils";
import { FIND_RESTAURANT_BY_ID_QUERY } from "@libs/server/queries/findRestaurantById.gql";
import {
  findRestaurantById,
  findRestaurantByIdVariables,
} from "@libs/server/queries/__generated__/findRestaurantById";
import { Role } from "__generated__/globalTypes";

const RestaurantDetail: NextPage = () => {
  const router = useRouter();
  const { data: user } = useMe();
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
      isRole={Role.Owner}
    >
      {loading ? (
        <LoadingPage />
      ) : (
        <div className="pb-24">
          <div className="bg-gray-300 w-full h-80 relative">
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
            {user?.whoAmI.id ===
              data?.findRestaurantById.restaurant?.ownerId && (
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

                <div
                  onClick={() => router.push(`/owner/${restaurantId}/counter`)}
                  className="py-2 px-4 bg-green-600 hover:bg-green-700  rounded-sm text-white text-sm cursor-pointer"
                >
                  Go Counter &rarr;
                </div>
              </div>
            )}
          </div>
          <div className="px-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4">
            {data?.findRestaurantById.restaurant?.dishes &&
              data?.findRestaurantById.restaurant?.dishes.map((dish) => (
                <div
                  key={dish.id}
                  className="border-[1px] flex flex-col justify-center items-start py-2 rounded-sm space-y-2 cursor-pointer"
                >
                  <div className="w-11/12 h-36 bg-black mx-auto cursor-pointer relative">
                    <Image
                      src={fileToUrl({ fileId: dish.photo, variant: "public" })}
                      layout="fill"
                      alt="dish photo"
                      className="absolute"
                    />
                  </div>
                  <div className="px-2 space-y-1 flex flex-col">
                    <span className="font-semibold text-sm">{dish.name}</span>
                    <span className="font-semibold text-xs">\{dish.price}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default RestaurantDetail;
