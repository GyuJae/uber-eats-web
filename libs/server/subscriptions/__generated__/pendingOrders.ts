/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: pendingOrders
// ====================================================

export interface pendingOrders_pendingOrders_client {
  __typename: "UserEntity";
  id: number;
  email: string;
}

export interface pendingOrders_pendingOrders_orderItems_dish {
  __typename: "DishEntity";
  name: string;
}

export interface pendingOrders_pendingOrders_orderItems_selectOptionChoices_option {
  __typename: "DishOptionEntity";
  id: number;
  name: string;
}

export interface pendingOrders_pendingOrders_orderItems_selectOptionChoices_choice {
  __typename: "DishOptionChoiceEntity";
  id: number;
  name: string;
}

export interface pendingOrders_pendingOrders_orderItems_selectOptionChoices {
  __typename: "SelectOptionChoicesEntityWithOptionAndChoice";
  option: pendingOrders_pendingOrders_orderItems_selectOptionChoices_option;
  choice: pendingOrders_pendingOrders_orderItems_selectOptionChoices_choice;
}

export interface pendingOrders_pendingOrders_orderItems {
  __typename: "OrderItemWithSelectOptionChoices";
  id: number;
  dish: pendingOrders_pendingOrders_orderItems_dish;
  selectOptionChoices: pendingOrders_pendingOrders_orderItems_selectOptionChoices[];
}

export interface pendingOrders_pendingOrders {
  __typename: "PendingOrderOutput";
  id: number;
  client: pendingOrders_pendingOrders_client;
  total: number | null;
  orderItems: pendingOrders_pendingOrders_orderItems[];
}

export interface pendingOrders {
  pendingOrders: pendingOrders_pendingOrders;
}
