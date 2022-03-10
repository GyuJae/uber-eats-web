/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderStatus } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL subscription operation: cookedOrders
// ====================================================

export interface cookedOrders_cookedOrders {
  __typename: "OrderEntity";
  id: number;
  createdAt: any;
  updatedAt: any;
  address: string;
  lat: number | null;
  lon: number | null;
  total: number | null;
  status: OrderStatus;
}

export interface cookedOrders {
  cookedOrders: cookedOrders_cookedOrders;
}
