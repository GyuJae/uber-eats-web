import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CREATE_ORDER_MUTATION } from "../libs/server/mutations/create-order.gql";
import {
  createOrder,
  createOrderVariables,
} from "../libs/server/mutations/__generated__/createOrder";
import { findRestaurantById_findRestaurantById_restaurant_dishes } from "../libs/server/queries/__generated__/findRestaurantById";
import ErrorSpan from "./ErrorSpan";

interface IDishItem {
  dish: findRestaurantById_findRestaurantById_restaurant_dishes;
}

const DishItem: React.FC<IDishItem> = ({ dish }) => {
  const router = useRouter();
  const {
    query: { id },
  } = router;
  const [dishModal, setDishModal] = useState<boolean>(false);
  const [orderCount, setOrderCount] = useState<number>(0);
  const [optionError, setOptionError] = useState<string | null>(null);
  const { register, getValues } = useForm();
  const [mutate, { loading }] = useMutation<createOrder, createOrderVariables>(
    CREATE_ORDER_MUTATION,
    {
      onCompleted: ({ createOrder: { ok, error } }) => {
        if (ok) {
          setDishModal(false);
        } else if (!ok && error) {
          setOptionError(error);
        }
      },
    }
  );

  const onlyOneCheck = (target: EventTarget & HTMLInputElement) => {
    if (target.checked) {
      const checkboxes = document.getElementsByName(target.name);
      checkboxes.forEach((box) => {
        /*// @ts-ignore */
        box.checked = false;
      });
      target.checked = true;
    } else {
      target.checked = false;
    }
  };

  const onBasketClick = () => {
    const options = getValues();
    const objValues = Object.values(options).filter(
      (item) => item.length !== 0
    );
    const noCheck = Object.values(options).filter((item) => item);
    if (
      Object.values(options).length !== objValues.length ||
      Object.values(options).length !== noCheck.length
    ) {
      setOptionError("Please check option.");
      return;
    } else {
      setOptionError(null);
    }
    const optionAndChoice: { optionId: number; choiceId: number }[] = [];
    for (const [key, value] of Object.entries(options)) {
      optionAndChoice.push({ optionId: +key, choiceId: +value[0] });
    }
    mutate({
      variables: {
        input: {
          restaurantId: +(id as string),
          dishId: dish.id,
          optionAndChoice,
        },
      },
    });
  };

  return (
    <div>
      {dishModal && (
        <div className="w-full flex justify-center py-10 absolute h-full top-0 left-0 ">
          <div
            onClick={() => {
              setDishModal(false);
            }}
            className="absolute bg-black opacity-75 w-full h-full top-0 left-0 z-10 "
          ></div>
          <div className="fixed w-[500px] h-[600px] overflow-y-auto opacity-100 shadow-lg rounded-md bg-white z-20">
            <div className="p-2 border-b-[1.5px] flex items-center space-x-2">
              <svg
                width="36px"
                height="36px"
                fill="none"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                focusable="false"
                className="cursor-pointer active:bg-gray-300 rounded-full p-2"
                onClick={() => setDishModal(false)}
              >
                <path
                  d="m19.5831 6.24931-1.8333-1.83329-5.75 5.83328-5.75-5.83328-1.8333 1.83329 5.8333 5.74999-5.8333 5.75 1.8333 1.8333 5.75-5.8333 5.75 5.8333 1.8333-1.8333-5.8333-5.75z"
                  fill="#000000"
                ></path>
              </svg>
              <span className="font-semibold">{dish.name}</span>
            </div>
            {/* <Image src={fileToUrl({fileId:dish.})} /> */}
            <div className="w-full h-44 bg-slate-400" />
            <div className="px-4 py-6 space-y-4">
              <div className="flex items-center space-x-4">
                <span className="font-semibold">가격</span>
                <span className="font-semibold">\{dish.price}</span>
              </div>
              {dish.options?.map((option) => (
                <details key={option.id}>
                  <summary className="font-semibold">{option.name}</summary>
                  <div className="px-2 space-y-1 mt-1">
                    {option.choices?.map((choice) => (
                      <div
                        key={choice.id}
                        className="flex items-center space-x-2"
                      >
                        <input
                          type="checkbox"
                          onClick={(event) => onlyOneCheck(event.currentTarget)}
                          value={choice.id}
                          {...register(option.id + "")}
                        />
                        <span className="text-sm">
                          {choice.name} +{choice.extra}원
                        </span>
                      </div>
                    ))}
                  </div>
                </details>
              ))}
              <div className="flex items-center space-x-4">
                <span className="font-semibold">수량</span>
                <div className="custom-number-input h-10 w-32">
                  <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent">
                    <button
                      onClick={() => {
                        if (orderCount > 0) {
                          setOrderCount((prev) => prev - 1);
                        }
                      }}
                      className=" bg-gray-200 text-gray-600 hover:text-gray-700 hover:bg-gray-300 h-full w-20 rounded-l cursor-pointer outline-none"
                    >
                      <span className="m-auto text-2xl font-thin">−</span>
                    </button>
                    <input
                      type="number"
                      className="outline-none focus:outline-none text-center w-full bg-gray-200 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700 "
                      name="custom-input-number"
                      value={orderCount}
                    />
                    <button
                      onClick={() => {
                        setOrderCount((prev) => prev + 1);
                      }}
                      className="bg-gray-200 text-gray-600 hover:text-gray-700 hover:bg-gray-300 h-full w-20 rounded-r cursor-pointer"
                    >
                      <span className="m-auto text-2xl font-thin">+</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div
              onClick={onBasketClick}
              className="w-[200px] hover:bg-green-700 cursor-pointer mx-auto flex justify-center items-center py-2 rounded-md text-white font-semibold bg-green-600"
            >
              {loading ? "loading..." : `${orderCount}개 담기`}
            </div>
            {optionError && (
              <div className="py-4">
                <ErrorSpan message={optionError} />
              </div>
            )}
          </div>
        </div>
      )}
      <div
        onClick={() => setDishModal(true)}
        className="border-[1px] flex flex-col justify-center items-start py-2 rounded-sm space-y-2"
      >
        <div className="w-11/12 h-36 bg-gray-400 mx-auto cursor-pointer" />
        <div className="px-2 space-y-1 flex flex-col cursor-pointer">
          <span className="font-semibold text-sm cursor-pointer">
            {dish.name}
          </span>
          <span className="font-semibold text-xs cursor-pointer">
            \{dish.price}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DishItem;
