import { gql } from "@apollo/client";
import { RESTAURANT_ITEM_FIELDS } from "../fragments/restaurantItem.fragment";

export const ALL_RESTAURANT_QUERY = gql`
  ${RESTAURANT_ITEM_FIELDS}
  query allRestaurant($input: AllRestaurantInput!) {
    allRestaurant(input: $input) {
      ok
      error
      totalPages
      totalResults
      result {
        ...ItemRestaurantFields
      }
    }
  }
`;
