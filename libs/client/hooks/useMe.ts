import { useQuery } from "@apollo/client";
import { WHOAMI_QUERY } from "../../server/queries/whoAmI.gql";
import { whoAmI } from "../../server/queries/__generated__/whoAmI";

export const useMe = () => {
  return useQuery<whoAmI>(WHOAMI_QUERY, {
    fetchPolicy: "network-only",
  });
};
