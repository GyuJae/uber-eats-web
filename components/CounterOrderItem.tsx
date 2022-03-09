import { useMutation } from "@apollo/client";
import { orderStatusToKorean } from "@libs/client/utils";
import { EDIT_ORDER_MUTATION } from "@libs/server/mutations/edit-order.gql";
import {
  editOrder,
  editOrderVariables,
} from "@libs/server/mutations/__generated__/editOrder";
import { GET_ORDERS_OWNER_QUERY } from "@libs/server/queries/getOrders.gql";
import { getOrdersForOwner_getOrders_orders } from "@libs/server/queries/__generated__/getOrdersForOwner";
import { OrderStatus } from "__generated__/globalTypes";

interface ICounterOrderItem {
  order: getOrdersForOwner_getOrders_orders;
}

const CounterOrderItem: React.FC<ICounterOrderItem> = ({ order }) => {
  const [mutate, { loading }] = useMutation<editOrder, editOrderVariables>(
    EDIT_ORDER_MUTATION
  );

  const onEditOrderMutate = ({ status }: { status: OrderStatus }) => {
    mutate({
      variables: {
        input: {
          orderId: order.id,
          status,
        },
      },
      refetchQueries: [GET_ORDERS_OWNER_QUERY, "getOrders"],
    });
  };

  return (
    <div className="py-2  border-[1px] rounded-md shadow-sm hover:shadow-md ">
      <div className="py-2 px-1 flex justify-between items-center">
        <span className="text-xs text-gray-500">
          {orderStatusToKorean(order.status)}
        </span>
        <div>
          {order.status === OrderStatus.Pending && (
            <div className="flex space-x-2 text-white">
              <div
                onClick={() =>
                  onEditOrderMutate({ status: OrderStatus.Cooking })
                }
                className="text-xs bg-red-700 p-1 cursor-pointer"
              >
                {loading ? "loading..." : "Take Order"}
              </div>
              <div
                onClick={() =>
                  onEditOrderMutate({ status: OrderStatus.Reject })
                }
                className="text-xs bg-black p-1 cursor-pointer"
              >
                {loading ? "loading..." : "Reject Order"}
              </div>
            </div>
          )}
          {order.status === OrderStatus.Cooking && (
            <div className="flex text-white">
              <div
                onClick={() =>
                  onEditOrderMutate({ status: OrderStatus.Cooked })
                }
                className="text-xs bg-green-700 p-1 cursor-pointer"
              >
                {loading ? "loading..." : "Order Cooked"}
              </div>
            </div>
          )}
        </div>
      </div>
      {order.orderItems.map((item) => (
        <div key={item.id} className="flex space-x-2 items-center px-3 text-sm">
          <span>{item.dish.name}</span>
          <div className="flex space-x-1">
            {item.selectOptionChoices.map((option) => (
              <div className="text-xs" key={option.id}>
                <span className="font-semibold">{option.option.name}</span>
                <span>-</span>
                <span>{option.choice.name}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className="my-4 h-1 w-full border-b-2 border-dotted border-black" />
      <div className="px-4">$ {order.total}</div>
    </div>
  );
};

export default CounterOrderItem;
