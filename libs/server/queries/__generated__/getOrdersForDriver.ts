/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetOrdersInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: getOrdersForDriver
// ====================================================

export interface getOrdersForDriver_getOrders_orders_client {
  __typename: "UserEntity";
  email: string;
}

export interface getOrdersForDriver_getOrders_orders {
  __typename: "OrdersWithRestaurantAndClient";
  id: number;
  address: string;
  lat: number | null;
  lon: number | null;
  total: number | null;
  client: getOrdersForDriver_getOrders_orders_client;
}

export interface getOrdersForDriver_getOrders {
  __typename: "GetOrdersOutput";
  ok: boolean;
  error: string | null;
  orders: getOrdersForDriver_getOrders_orders[] | null;
}

export interface getOrdersForDriver {
  getOrders: getOrdersForDriver_getOrders;
}

export interface getOrdersForDriverVariables {
  input: GetOrdersInput;
}
