import { useQuery } from "@apollo/client";
import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { Role } from "__generated__/globalTypes";
import DishItem from "../../../components/DishItem";
import Layout from "../../../components/Layout";
import LoadingPage from "../../../components/LoadingPage";
import OrdersBasket from "../../../components/OrdersBasket";
import { fileToUrl } from "../../../libs/client/utils";
import { FIND_RESTAURANT_BY_ID_QUERY } from "../../../libs/server/queries/findRestaurantById.gql";
import {
  findRestaurantById,
  findRestaurantByIdVariables,
} from "../../../libs/server/queries/__generated__/findRestaurantById";
import { basketState } from "../../../providers/basket.state";

const RestaurantDetail: NextPage = () => {
  const router = useRouter();
  const [isOrdersBasket, setOrdersBasket] = useState<boolean>(false);
  const orderBasket = useRecoilValue(basketState);
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
    <Layout title="Restaurant" isRole={Role.Client}>
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
                className="absolute object-cover"
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
          <div className="relative py-2 px-4">
            <div
              onClick={() => setOrdersBasket(true)}
              className="flex w-28 justify-center items-center space-x-2 font-medium text-sm cursor-pointer px-3 py-2 rounded-3xl bg-black text-white hover:bg-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
              <div>
                Cart <span>&#183; {orderBasket.length}</span>
              </div>
            </div>
            {isOrdersBasket && (
              <OrdersBasket setOrdersBasket={setOrdersBasket} />
            )}
          </div>

          <div className="px-4 py-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4 ">
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
