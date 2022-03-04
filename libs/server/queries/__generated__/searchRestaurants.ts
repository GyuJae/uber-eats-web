/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SearchRestaurantsInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: searchRestaurants
// ====================================================

export interface searchRestaurants_searchRestaurants_result {
  __typename: "RestaurantEntity";
  id: number;
  name: string;
  coverImg: string;
  address: string;
}

export interface searchRestaurants_searchRestaurants {
  __typename: "SearchRestaurantsOutput";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  totalResults: number | null;
  result: searchRestaurants_searchRestaurants_result[] | null;
}

export interface searchRestaurants {
  searchRestaurants: searchRestaurants_searchRestaurants;
}

export interface searchRestaurantsVariables {
  input: SearchRestaurantsInput;
}
