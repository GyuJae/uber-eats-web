/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetOrdersInput, OrderStatus } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: getOrders
// ====================================================

export interface getOrders_getOrders_orders_restaurant {
  __typename: "RestaurantEntity";
  id: number;
  name: string;
  ownerId: number;
  address: string;
  coverImg: string;
  categoryId: number;
}

export interface getOrders_getOrders_orders {
  __typename: "OrdersWithRestaurant";
  id: number;
  createdAt: any;
  updatedAt: any;
  driverId: number | null;
  clientId: number;
  restaurantId: number;
  total: number | null;
  status: OrderStatus;
  restaurant: getOrders_getOrders_orders_restaurant;
}

export interface getOrders_getOrders {
  __typename: "GetOrdersOutput";
  ok: boolean;
  error: string | null;
  orders: getOrders_getOrders_orders[] | null;
}

export interface getOrders {
  getOrders: getOrders_getOrders;
}

export interface getOrdersVariables {
  input: GetOrdersInput;
}
