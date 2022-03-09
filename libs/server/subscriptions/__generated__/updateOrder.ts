/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import {
  UpdateOrderInput,
  OrderStatus,
} from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL subscription operation: updateOrder
// ====================================================

export interface updateOrder_updateOrder {
  __typename: "OrderEntity";
  id: number;
  status: OrderStatus;
}

export interface updateOrder {
  updateOrder: updateOrder_updateOrder;
}

export interface updateOrderVariables {
  input: UpdateOrderInput;
}
