/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetOrdersInput, OrderStatus } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: getOrdersForOwner
// ====================================================

export interface getOrdersForOwner_getOrders_orders_orderItems_dish {
  __typename: "DishEntity";
  id: number;
  name: string;
}

export interface getOrdersForOwner_getOrders_orders_orderItems_selectOptionChoices_option {
  __typename: "DishOptionEntity";
  id: number;
  name: string;
}

export interface getOrdersForOwner_getOrders_orders_orderItems_selectOptionChoices_choice {
  __typename: "DishOptionChoiceEntity";
  id: number;
  name: string;
}

export interface getOrdersForOwner_getOrders_orders_orderItems_selectOptionChoices {
  __typename: "SelectOptionChoicesWithOptionAndChoice";
  id: number;
  option: getOrdersForOwner_getOrders_orders_orderItems_selectOptionChoices_option;
  choice: getOrdersForOwner_getOrders_orders_orderItems_selectOptionChoices_choice;
}

export interface getOrdersForOwner_getOrders_orders_orderItems {
  __typename: "OrderItemWithSelectOptionAndChoice";
  id: number;
  count: number;
  dish: getOrdersForOwner_getOrders_orders_orderItems_dish;
  selectOptionChoices: getOrdersForOwner_getOrders_orders_orderItems_selectOptionChoices[];
}

export interface getOrdersForOwner_getOrders_orders_client {
  __typename: "UserEntity";
  id: number;
  email: string;
}

export interface getOrdersForOwner_getOrders_orders {
  __typename: "OrdersWithRestaurantAndClient";
  id: number;
  createdAt: any;
  updatedAt: any;
  driverId: number | null;
  clientId: number;
  restaurantId: number;
  total: number | null;
  status: OrderStatus;
  orderItems: getOrdersForOwner_getOrders_orders_orderItems[];
  client: getOrdersForOwner_getOrders_orders_client;
}

export interface getOrdersForOwner_getOrders {
  __typename: "GetOrdersOutput";
  ok: boolean;
  error: string | null;
  orders: getOrdersForOwner_getOrders_orders[] | null;
}

export interface getOrdersForOwner {
  getOrders: getOrdersForOwner_getOrders;
}

export interface getOrdersForOwnerVariables {
  input: GetOrdersInput;
}
