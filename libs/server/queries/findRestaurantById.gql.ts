import { gql } from "@apollo/client";

export const FIND_RESTAURANT_BY_ID_QUERY = gql`
  query findRestaurantById($input: FindRestaurantByIdInput!) {
    findRestaurantById(input: $input) {
      ok
      error
      restaurant {
        id
        createdAt
        name
        address
        coverImg
        ownerId
      }
    }
  }
`;
