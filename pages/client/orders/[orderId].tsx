import { useSubscription } from "@apollo/client";
import { UPDATE_ORDER_SUBSCRIPTION } from "@libs/server/subscriptions/update-order.gql";
import {
  updateOrder,
  updateOrderVariables,
} from "@libs/server/subscriptions/__generated__/updateOrder";
import type { NextPage } from "next";
import { useRouter } from "next/router";

const OrderDetail: NextPage = () => {
  const router = useRouter();
  const {
    query: { orderId },
  } = router;
  const { data, loading } = useSubscription<updateOrder, updateOrderVariables>(
    UPDATE_ORDER_SUBSCRIPTION,
    {
      variables: {
        input: {
          orderId: +(orderId as string),
        },
      },
    }
  );
  return <div>{loading ? "loading..." : data?.updateOrder.status}</div>;
};

export default OrderDetail;
