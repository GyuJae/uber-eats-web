import { useMutation, useQuery, useSubscription } from "@apollo/client";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import Layout from "../../../../components/Layout";
import LoadingPage from "../../../../components/LoadingPage";
import { orderStatusToKorean } from "../../../../libs/client/utils";
import { EDIT_ORDER_MUTATION } from "../../../../libs/server/mutations/edit-order.gql";
import {
  editOrder,
  editOrderVariables,
} from "../../../../libs/server/mutations/__generated__/editOrder";
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
  const { data, loading } = useSubscription<pendingOrders>(
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
  const [editOrderMutate, { loading: editOrderLoading }] = useMutation<
    editOrder,
    editOrderVariables
  >(EDIT_ORDER_MUTATION);

  const onEditCookingOrder = (orderId: number) => {
    editOrderMutate({
      variables: {
        input: {
          orderId,
          status: OrderStatus.Cooking,
        },
      },
    });
  };

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
      <div>
        <div className="px-4 py-2 font-semibold">New Order</div>
        {loading ? (
          <LoadingPage />
        ) : (
          data?.pendingOrders && (
            <div className="px-20 grid grid-cols-4">
              <div className="border-2 border-black px-2 py-4 rounded-md shadow-md">
                <div className="border-b-2 py-2">
                  <span className="font-semibold">From: </span>
                  <span>{data?.pendingOrders.client.email}</span>
                </div>
                {data?.pendingOrders.orderItems.map((item) => (
                  <div className="py-2" key={item.id}>
                    <div className="font-semibold">{item.dish.name}</div>
                    {item.selectOptionChoices.map((select) => (
                      <div className="px-2 space-x-3" key={select.option.id}>
                        <span>{select.option.name}</span>
                        <span>{select.choice.name}</span>
                      </div>
                    ))}
                  </div>
                ))}
                <div>
                  <span className="font-semibold">Total : </span>
                  <span>${data?.pendingOrders.total}</span>
                </div>
                <div
                  onClick={() => onEditCookingOrder(data.pendingOrders.id)}
                  className="mt-2 p-1 font-semibold text-white bg-black flex justify-center items-center cursor-pointer"
                >
                  {editOrderLoading ? "loading..." : "Take Order"}
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </Layout>
  );
};

export default Pending;
