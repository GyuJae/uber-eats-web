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

export interface CreateRestaurantInput {
  name: string;
  address: string;
  coverImg: string;
  categoryName: string;
}

export interface EditProfileInput {
  email?: string | null;
  password?: string | null;
  role?: Role | null;
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
