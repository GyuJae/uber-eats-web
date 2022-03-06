import { useSubscription } from "@apollo/client";
import { NextPage } from "next";
import { PENDING_ORDERS_SUBSCRIPTION } from "../../../libs/server/subscriptions/pending-orders.gql";
import { pendingOrders } from "../../../libs/server/subscriptions/__generated__/pendingOrders";

const Pending: NextPage = () => {
  const { data, loading } = useSubscription<pendingOrders>(
    PENDING_ORDERS_SUBSCRIPTION
  );
  return (
    <div>
      {" "}
      New Order : {loading ? "loading" : data?.pendingOrders.client.email}
    </div>
  );
};

export default Pending;
