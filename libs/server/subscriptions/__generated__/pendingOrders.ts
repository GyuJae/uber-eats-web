/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderStatus } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL subscription operation: pendingOrders
// ====================================================

export interface pendingOrders_pendingOrders_restaurant {
  __typename: "RestaurantEntity";
  id: number;
  name: string;
}

export interface pendingOrders_pendingOrders_client {
  __typename: "UserEntity";
  id: number;
  email: string;
}

export interface pendingOrders_pendingOrders {
  __typename: "PendingOrderOutput";
  id: number;
  createdAt: any;
  updatedAt: any;
  status: OrderStatus;
  total: number | null;
  restaurant: pendingOrders_pendingOrders_restaurant;
  client: pendingOrders_pendingOrders_client;
}

export interface pendingOrders {
  pendingOrders: pendingOrders_pendingOrders;
}
