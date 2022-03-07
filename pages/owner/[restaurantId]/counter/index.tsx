import { useQuery, useSubscription } from "@apollo/client";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import Layout from "../../../../components/Layout";
import LoadingPage from "../../../../components/LoadingPage";
import { orderStatusToKorean } from "../../../../libs/client/utils";
import { GET_ORDERS_OWNER_QUERY } from "../../../../libs/server/queries/getOrders.gql";
import {
  getOrdersForOwner,
  getOrdersForOwnerVariables,
} from "../../../../libs/server/queries/__generated__/getOrdersForOwner";
import { PENDING_ORDERS_SUBSCRIPTION } from "../../../../libs/server/subscriptions/pending-orders.gql";
import { pendingOrders } from "../../../../libs/server/subscriptions/__generated__/pendingOrders";
import { OrderStatus } from "../../../../__generated__/globalTypes";

const Pending: NextPage = () => {
  const router = useRouter();
  const {
    query: { restaurantId },
  } = router;
  const [status, setStatus] = useState<OrderStatus | null>(null);
  const { data, loading, error } = useSubscription<pendingOrders>(
    PENDING_ORDERS_SUBSCRIPTION
  );
  const { data: ordersData, loading: ordersLoading } = useQuery<
    getOrdersForOwner,
    getOrdersForOwnerVariables
  >(GET_ORDERS_OWNER_QUERY, {
    variables: {
      input: {
        status,
      },
    },
  });
  return (
    <Layout title="counter" isAuthPage>
      {ordersLoading ? (
        <LoadingPage />
      ) : (
        <div>
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 gap-y-6">
            {ordersData?.getOrders.orders?.map((order) => (
              <div
                key={order.id}
                className="py-2  border-[1px] rounded-md shadow-sm hover:shadow-md cursor-pointer"
                onClick={() =>
                  router.push(`/owner/${restaurantId}/counter/${order.id}`)
                }
              >
                <div className="py-2 px-1 flex flex-col">
                  <span className="font-medium">{order.client.email}</span>
                  <span className="text-sm text-gray-500">
                    {orderStatusToKorean(order.status)}
                  </span>
                  <span className="text-sm text-gray-500">{}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}{" "}
      New Order : {loading ? "loading" : data?.pendingOrders.client.email}{" "}
      {error && <span className="text-red-500">{error}</span>}
    </Layout>
  );
};

export default Pending;
