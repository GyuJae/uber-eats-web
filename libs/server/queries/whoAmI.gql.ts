import { gql } from "@apollo/client";
import { USER_FIELDS } from "../fragments/user.fragment";

export const WHOAMI_QUERY = gql`
  ${USER_FIELDS}
  query whoAmI {
    whoAmI {
      ...CoreUserFields
    }
  }
`;
