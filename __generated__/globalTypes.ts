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

export interface CreateAccountInput {
  email: string;
  password: string;
  role: Role;
}

export interface LoginInput {
  email: string;
  password: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================