import { gql } from "@apollo/client";

export const USER_FIELDS = gql`
  fragment CoreUserFields on UserEntity {
    email
    role
  }
`;
