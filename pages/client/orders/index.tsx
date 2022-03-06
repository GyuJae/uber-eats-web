import { useQuery } from "@apollo/client";
import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import Layout from "../../../components/Layout";
import LoadingPage from "../../../components/LoadingPage";
import { fileToUrl, orderStatusToKorean } from "../../../libs/client/utils";
import { GET_ORDERS_QUERY } from "../../../libs/server/queries/getOrders.gql";
import {
  getOrders,
  getOrdersVariables,
} from "../../../libs/server/queries/__generated__/getOrders";
import { OrderStatus } from "../../../__generated__/globalTypes";

const Orders: NextPage = () => {
  const router = useRouter();
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
    <Layout title="Order">
      {loading ? (
        <LoadingPage />
      ) : (
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 gap-y-6">
          {data?.getOrders.orders?.map((order) => (
            <div
              key={order.id}
              className="py-2  border-[1px] rounded-md shadow-sm hover:shadow-2xl cursor-pointer"
              onClick={() => router.push(`/client/orders/${order.id}`)}
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
              <div className="py-2 px-1 space-x-2">
                <span className="font-medium">{order.restaurant.name}</span>
                <span className="text-sm text-gray-500">
                  {orderStatusToKorean(order.status)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default Orders;
