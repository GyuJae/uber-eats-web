import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { CREATE_ORDER_MUTATION } from "../libs/server/mutations/create-order.gql";
import {
  createOrder,
  createOrderVariables,
} from "../libs/server/mutations/__generated__/createOrder";
import { basketState } from "../providers/basket.state";
import ErrorSpan from "./ErrorSpan";

interface IOrdersBaseket {
  setOrdersBasket: any;
}

const OrdersBasket: React.FC<IOrdersBaseket> = ({ setOrdersBasket }) => {
  const router = useRouter();
  const {
    query: { id },
  } = router;
  const [orderError, setOrderError] = useState<string | null>(null);
  const [state, setState] = useRecoilState(basketState);
  const [mutate, { loading }] = useMutation<createOrder, createOrderVariables>(
    CREATE_ORDER_MUTATION,
    {
      onCompleted: ({ createOrder: { ok, error } }) => {
        if (ok) {
          router.push("/client/orders");
        } else if (!ok && error) {
          setOrderError(error);
        }
      },
    }
  );
  const onDeleteOrderItem = (id: number) => {
    setState((prev) => prev.filter((item) => item.id !== id));
  };
  const createOrderInputList = state.map((input) => ({
    dishId: input.dishId,
    optionAndChoice: input.optionAndChoice,
  }));

  const onCreateOrder = () => {
    if (loading) return;
    mutate({
      variables: {
        input: {
          restaurantId: +(id as string),
          createOrderInputList,
        },
      },
    });
  };

  return (
    <div className="absolute top-14 left-28 w-96 min-h-[280px] bg-white rounded-sm shadow-md overflow-y-auto z-20">
      <div className=" p-2">
        <svg
          width="36px"
          height="36px"
          fill="none"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          focusable="false"
          className="cursor-pointer hover:bg-gray-300 active:bg-gray-200 rounded-full p-2"
          onClick={() => setOrdersBasket(false)}
        >
          <path
            d="m19.5831 6.24931-1.8333-1.83329-5.75 5.83328-5.75-5.83328-1.8333 1.83329 5.8333 5.74999-5.8333 5.75 1.8333 1.8333 5.75-5.8333 5.75 5.8333 1.8333-1.8333-5.8333-5.75z"
            fill="#000000"
          ></path>
        </svg>
      </div>
      {state.length === 0 ? (
        <div className="flex justify-center items-center h-full py-20">
          <span className="font-semibold">No Items</span>
        </div>
      ) : (
        <div>
          <div className="overflow-y-auto h-[180px]">
            {state.map((item) => (
              <div key={item.dishId} className="px-4 py-2 border-b-[1px] ">
                <div className="flex justify-between">
                  <div className="flex space-x-2 ">
                    <span className="font-semibold text-sm">
                      {item.dishName}
                    </span>
                    <div>
                      {item.optionAndChoice_name.map((option) => (
                        <div
                          key={option.optionName}
                          className="text-xs text-gray-500"
                        >
                          <span>{option.optionName}</span>
                          <span>({option.choiceName})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex space-x-2 ">
                    <span className="text-sm">{item.count}개</span>
                    <div
                      onClick={() => onDeleteOrderItem(item.id)}
                      className="flex mt-[2px]"
                    >
                      <svg
                        width="18px"
                        height="18px"
                        fill="none"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        focusable="false"
                        className="cursor-pointer active:bg-gray-200 rounded-full"
                      >
                        <path
                          d="m19.5831 6.24931-1.8333-1.83329-5.75 5.83328-5.75-5.83328-1.8333 1.83329 5.8333 5.74999-5.8333 5.75 1.8333 1.8333 5.75-5.8333 5.75 5.8333 1.8333-1.8333-5.8333-5.75z"
                          fill="#999999"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {orderError && (
            <div>
              <ErrorSpan message={orderError} />
            </div>
          )}
          <div
            onClick={onCreateOrder}
            className="flex justify-center items-center bg-green-500 cursor-pointer hover:bg-green-600  py-4 rounded-t-md"
          >
            <span className="font-semibold text-white text-sm ">
              {loading ? "loading..." : "배달 시키기"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersBasket;
