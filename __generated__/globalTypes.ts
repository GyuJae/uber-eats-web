/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

/**
 * The supported user role.
 */
export enum Role {
  Client = "Client",
  Delivery = "Delivery",
  Owner = "Owner",
}

export interface AllRestaurantInput {
  page?: number | null;
}

export interface CreateAccountInput {
  email: string;
  password: string;
  role: Role;
}

export interface CreateDishInput {
  name: string;
  price: number;
  photo: string;
  description: string;
  restaurantId: number;
  options?: DishOptionAndChoice[] | null;
}

export interface CreateRestaurantInput {
  name: string;
  address: string;
  coverImg: string;
  categoryName: string;
}

export interface DishOptionAndChoice {
  content: DishOptionInput;
  choices?: DishOptionChoiceInput[] | null;
}

export interface DishOptionChoiceInput {
  name: string;
  extra: number;
}

export interface DishOptionInput {
  name: string;
  extra: number;
}

export interface EditProfileInput {
  email?: string | null;
  password?: string | null;
  role?: Role | null;
}

export interface FindRestaurantByIdInput {
  restaurantId: number;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface SearchRestaurantsInput {
  page?: number | null;
  keyword: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
