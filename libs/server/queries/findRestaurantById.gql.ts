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
        dishes {
          id
          name
          price
          photo
          description
          options {
            id
            name
            choices {
              id
              name
              extra
            }
          }
        }
      }
    }
  }
`;
