/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetOrdersInput, OrderStatus } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: getOrdersForOwner
// ====================================================

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
