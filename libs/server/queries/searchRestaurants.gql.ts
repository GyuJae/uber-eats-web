import { gql } from "@apollo/client";
import { RESTAURANT_ITEM_FIELDS } from "../fragments/restaurantItem.fragment";

export const SEARCH_RESTAURANTS_QUERY = gql`
  ${RESTAURANT_ITEM_FIELDS}
  query searchRestaurants($input: SearchRestaurantsInput!) {
    searchRestaurants(input: $input) {
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
