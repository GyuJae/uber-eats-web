import { useQuery } from "@apollo/client";
import Image from "next/image";
import { useRouter } from "next/router";
import DishItem from "../../../components/DishItem";
import Layout from "../../../components/Layout";
import LoadingPage from "../../../components/LoadingPage";
import { fileToUrl } from "../../../libs/client/utils";
import { FIND_RESTAURANT_BY_ID_QUERY } from "../../../libs/server/queries/findRestaurantById.gql";
import {
  findRestaurantById,
  findRestaurantByIdVariables,
} from "../../../libs/server/queries/__generated__/findRestaurantById";

const RestaurantDetail = () => {
  const router = useRouter();
  const {
    query: { id: restaurantId },
  } = router;
  const { loading, data } = useQuery<
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
    <Layout title="Restaurant">
      {loading ? (
        <LoadingPage />
      ) : (
        <div className="pb-20">
          <div className="relative h-96">
            {data?.findRestaurantById.restaurant?.coverImg ? (
              <Image
                src={fileToUrl({
                  fileId: data?.findRestaurantById.restaurant?.coverImg,
                  variant: "public",
                })}
                layout="fill"
                alt="restaurant photo"
                className="absolute"
              />
            ) : (
              <div className="w-full h-96 bg-gray-800" />
            )}

            <div className="w-80 h-32 px-4 bg-white absolute bottom-16 flex flex-col justify-center space-y-2 ">
              <span className="font-semibold text-xl">
                {data?.findRestaurantById.restaurant?.name}
              </span>
              <span className="text-sm text-gray-500">
                {data?.findRestaurantById.restaurant?.address}
              </span>
            </div>
          </div>

          <div className="px-4 py-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4 ">
            {data?.findRestaurantById.restaurant?.dishes &&
              data.findRestaurantById.restaurant.dishes.map((dish) => (
                <DishItem key={dish.id} dish={dish} />
              ))}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default RestaurantDetail;
