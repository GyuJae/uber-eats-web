/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FindRestaurantByIdInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: findRestaurantById
// ====================================================

export interface findRestaurantById_findRestaurantById_restaurant_dishes_options_choices {
  __typename: "DishOptionChoiceEntity";
  id: number;
  name: string;
  extra: number | null;
}

export interface findRestaurantById_findRestaurantById_restaurant_dishes_options {
  __typename: "DishOptionWithChoice";
  id: number;
  name: string;
  choices: findRestaurantById_findRestaurantById_restaurant_dishes_options_choices[] | null;
}

export interface findRestaurantById_findRestaurantById_restaurant_dishes {
  __typename: "DishWithOption";
  id: number;
  name: string;
  price: number;
  photo: string;
  description: string;
  options: findRestaurantById_findRestaurantById_restaurant_dishes_options[] | null;
}

export interface findRestaurantById_findRestaurantById_restaurant {
  __typename: "RestaurantWithDishes";
  id: number;
  createdAt: any;
  name: string;
  address: string;
  coverImg: string;
  ownerId: number;
  dishes: findRestaurantById_findRestaurantById_restaurant_dishes[] | null;
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
