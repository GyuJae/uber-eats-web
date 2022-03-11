import { useMutation, useQuery, useSubscription } from "@apollo/client";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "@components/Layout";
import LoadingPage from "@components/LoadingPage";
import { classToString, orderStatusToKorean } from "@libs/client/utils";
import { EDIT_ORDER_MUTATION } from "@libs/server/mutations/edit-order.gql";
import {
  editOrder,
  editOrderVariables,
} from "@libs/server/mutations/__generated__/editOrder";
import { GET_ORDERS_OWNER_QUERY } from "@libs/server/queries/getOrders.gql";
import {
  getOrdersForOwner,
  getOrdersForOwnerVariables,
} from "@libs/server/queries/__generated__/getOrdersForOwner";
import { PENDING_ORDERS_SUBSCRIPTION } from "@libs/server/subscriptions/pending-orders.gql";
import {
  pendingOrders,
  pendingOrders_pendingOrders,
} from "@libs/server/subscriptions/__generated__/pendingOrders";
import { OrderStatus, Role } from "../../../../__generated__/globalTypes";
import CounterOrderItem from "@components/CounterOrderItem";

const Counter: NextPage = () => {
  const [status, setStatus] = useState<OrderStatus>(OrderStatus.Pending);
  const [takeOrders, setTakeOrders] = useState<pendingOrders_pendingOrders[]>(
    []
  );
  const { data, loading } = useSubscription<pendingOrders>(
    PENDING_ORDERS_SUBSCRIPTION
  );
  useEffect(() => {
    setTakeOrders((prev) => {
      if (data?.pendingOrders) {
        return [...prev, data?.pendingOrders];
      }
      return prev;
    });
  }, [data?.pendingOrders]);

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

  const onEditCookingOrder = (
    orderId: number,
    status: OrderStatus.Cooking | OrderStatus.Reject
  ) => {
    if (editOrderLoading) return;
    editOrderMutate({
      variables: {
        input: {
          orderId,
          status,
        },
      },
      refetchQueries: [GET_ORDERS_OWNER_QUERY, "getOrders"],
    });
    setTakeOrders((prev) => prev.filter((order) => order.id !== orderId));
  };

  return (
    <Layout title="counter" isRole={Role.Owner}>
      {ordersLoading ? (
        <div className="py-10 flex justify-center items-center">loading...</div>
      ) : (
        <div>
          <div className="flex space-x-2 pt-6 pb-3 px-4">
            {Object.keys(OrderStatus).map((orderStatus) => (
              <div
                key={orderStatus}
                className={classToString(
                  "cursor-pointer font-semibold",
                  status === orderStatus
                    ? "underline underline-offset-4 text-green-500"
                    : ""
                )}
                onClick={() => setStatus(orderStatus as OrderStatus)}
              >
                {orderStatusToKorean(orderStatus as OrderStatus)}
              </div>
            ))}
          </div>
          <div className="p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 gap-y-6">
            {ordersData?.getOrders.orders?.map((order) => (
              <CounterOrderItem key={order.id} order={order} />
            ))}
          </div>
        </div>
      )}{" "}
      <div>
        <div className="px-4 py-2  font-semibold">New Order</div>
        <div className="p-4 flex justify-center items-center">
          {loading ? (
            <div className="flex py-12 justify-center items-center font-semibold">
              Waiting...
            </div>
          ) : (
            takeOrders &&
            takeOrders.length > 0 &&
            takeOrders.map((order) => (
              <div key={order.id} className="px-20 max-w-md ">
                <div className="border-2 border-black px-2 py-4 rounded-md shadow-md">
                  <div className="border-b-2 py-2">
                    <span className="font-semibold">From: </span>
                    <span>{order.client.email}</span>
                  </div>
                  {order.orderItems.map((item) => (
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
                    <span>${order.total}</span>
                  </div>
                  <div
                    onClick={() => {
                      onEditCookingOrder(order.id, OrderStatus.Cooking);
                    }}
                    className="mt-2 p-1 font-semibold text-white bg-black flex justify-center items-center cursor-pointer"
                  >
                    {editOrderLoading ? "loading..." : "Take Order"}
                  </div>
                  <div
                    onClick={() => {
                      onEditCookingOrder(order.id, OrderStatus.Reject);
                    }}
                    className="mt-2 p-1 font-semibold text-white bg-red-700 flex justify-center items-center cursor-pointer"
                  >
                    {editOrderLoading ? "loading..." : "Reject Order"}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Counter;
