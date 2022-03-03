/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AllRestaurantInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: allRestaurant
// ====================================================

export interface allRestaurant_allRestaurant_result {
  __typename: "RestaurantEntity";
  id: number;
  name: string;
  coverImg: string;
  address: string;
}

export interface allRestaurant_allRestaurant {
  __typename: "AllRestaurantOutput";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  totalResults: number | null;
  result: allRestaurant_allRestaurant_result[] | null;
}

export interface allRestaurant {
  allRestaurant: allRestaurant_allRestaurant;
}

export interface allRestaurantVariables {
  input: AllRestaurantInput;
}
