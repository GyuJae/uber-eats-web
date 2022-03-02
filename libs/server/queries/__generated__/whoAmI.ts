/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Role } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: whoAmI
// ====================================================

export interface whoAmI_whoAmI {
  __typename: "UserEntity";
  email: string;
  role: Role;
}

export interface whoAmI {
  whoAmI: whoAmI_whoAmI;
}
