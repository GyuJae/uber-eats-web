/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FindRestaurantByIdInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: findRestaurantById
// ====================================================

export interface findRestaurantById_findRestaurantById_restaurant {
  __typename: "RestaurantEntity";
  id: number;
  createdAt: any;
  name: string;
  address: string;
  coverImg: string;
  ownerId: number;
}

export interface findRestaurantById_findRestaurantById {
  __typename: "FindRestaurantByIdOutput";
  ok: boolean;
  error: string | null;
  restaurant: findRestaurantById_findRestaurantById_restaurant | null;
}

export interface findRestaurantById {
  findRestaurantById: findRestaurantById_findRestaurantById;
}

export interface findRestaurantByIdVariables {
  input: FindRestaurantByIdInput;
}
