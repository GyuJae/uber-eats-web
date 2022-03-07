/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetDetailOrderInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: getDetailOrder
// ====================================================

export interface getDetailOrder_getDetailOrder_order_orderItems_dish {
  __typename: "DishEntity";
  id: number;
  name: string;
}

export interface getDetailOrder_getDetailOrder_order_orderItems_selectOptionChoices_option {
  __typename: "DishOptionEntity";
  id: number;
  name: string;
}

export interface getDetailOrder_getDetailOrder_order_orderItems_selectOptionChoices_choice {
  __typename: "DishOptionChoiceEntity";
  id: number;
  name: string;
}

export interface getDetailOrder_getDetailOrder_order_orderItems_selectOptionChoices {
  __typename: "SelectOptionChoicesEntityResult";
  option: getDetailOrder_getDetailOrder_order_orderItems_selectOptionChoices_option;
  choice: getDetailOrder_getDetailOrder_order_orderItems_selectOptionChoices_choice;
}

export interface getDetailOrder_getDetailOrder_order_orderItems {
  __typename: "OrderItemResult";
  id: number;
  dish: getDetailOrder_getDetailOrder_order_orderItems_dish;
  selectOptionChoices: getDetailOrder_getDetailOrder_order_orderItems_selectOptionChoices[];
}

export interface getDetailOrder_getDetailOrder_order {
  __typename: "OrderResult";
  id: number;
  orderItems: getDetailOrder_getDetailOrder_order_orderItems[];
}

export interface getDetailOrder_getDetailOrder {
  __typename: "GetDetailOrderOutput";
  ok: boolean;
  error: string | null;
  order: getDetailOrder_getDetailOrder_order | null;
}

export interface getDetailOrder {
  getDetailOrder: getDetailOrder_getDetailOrder;
}

export interface getDetailOrderVariables {
  input: GetDetailOrderInput;
}
