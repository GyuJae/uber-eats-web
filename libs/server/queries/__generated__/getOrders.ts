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

export interface getOrders_getOrders_orders_orderItems_dish {
  __typename: "DishEntity";
  id: number;
  name: string;
}

export interface getOrders_getOrders_orders_orderItems_selectOptionChoices_option {
  __typename: "DishOptionEntity";
  id: number;
  name: string;
}

export interface getOrders_getOrders_orders_orderItems_selectOptionChoices_choice {
  __typename: "DishOptionChoiceEntity";
  id: number;
  name: string;
}

export interface getOrders_getOrders_orders_orderItems_selectOptionChoices {
  __typename: "SelectOptionChoicesWithOptionAndChoice";
  id: number;
  option: getOrders_getOrders_orders_orderItems_selectOptionChoices_option;
  choice: getOrders_getOrders_orders_orderItems_selectOptionChoices_choice;
}

export interface getOrders_getOrders_orders_orderItems {
  __typename: "OrderItemWithSelectOptionAndChoice";
  id: number;
  count: number;
  dish: getOrders_getOrders_orders_orderItems_dish;
  selectOptionChoices: getOrders_getOrders_orders_orderItems_selectOptionChoices[];
}

export interface getOrders_getOrders_orders {
  __typename: "OrdersWithRestaurantAndClient";
  id: number;
  createdAt: any;
  updatedAt: any;
  driverId: number | null;
  clientId: number;
  restaurantId: number;
  total: number | null;
  status: OrderStatus;
  restaurant: getOrders_getOrders_orders_restaurant;
  orderItems: getOrders_getOrders_orders_orderItems[];
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
