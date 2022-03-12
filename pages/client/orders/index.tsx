import { useQuery } from "@apollo/client";
import type { NextPage } from "next";
import Image from "next/image";
import { useState } from "react";
import Layout from "@components/Layout";
import LoadingPage from "@components/LoadingPage";
import { fileToUrl, orderStatusToKorean } from "@libs/client/utils";
import { GET_ORDERS_QUERY } from "@libs/server/queries/getOrders.gql";
import {
  getOrders,
  getOrdersVariables,
} from "@libs/server/queries/__generated__/getOrders";
import Food from "@svgs/Food.svg";
import { OrderStatus, Role } from "../../../__generated__/globalTypes";

const Orders: NextPage = () => {
  const [status, setStatus] = useState<OrderStatus | null>(null);
  const { data, loading } = useQuery<getOrders, getOrdersVariables>(
    GET_ORDERS_QUERY,
    {
      variables: {
        input: {
          status,
        },
      },
    }
  );

  return (
    <Layout title="Order" isRole={Role.Client}>
      {loading ? (
        <LoadingPage />
      ) : (
        <div>
          {!data?.getOrders.orders || data?.getOrders.orders.length === 0 ? (
            <div className="flex flex-col space-y-2 w-full py-20 justify-center items-center">
              <Food />
              <div className="font-semibold">No Order Items.</div>
            </div>
          ) : (
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 gap-y-6">
              {data?.getOrders.orders?.map((order) => (
                <div
                  key={order.id}
                  className="py-2  border-[1px] rounded-md shadow-sm hover:shadow-md cursor-pointer"
                >
                  <div className="relative h-48">
                    <Image
                      src={fileToUrl({
                        fileId: order.restaurant.coverImg,
                        variant: "public",
                      })}
                      layout="fill"
                      alt="restaurant image"
                      className="absolute"
                    />
                  </div>
                  <div className="flex justify-between py-2 px-1 space-x-2">
                    <div className="font-medium">{order.restaurant.name}</div>
                    <div className="font-semibold text-sm bg-green-300 text-green-800 p-1 rounded-sm">
                      {orderStatusToKorean(order.status)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </Layout>
  );
};

export default Orders;
