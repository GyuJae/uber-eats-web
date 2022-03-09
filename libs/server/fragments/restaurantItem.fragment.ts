import { gql } from "@apollo/client";

export const RESTAURANT_ITEM_FIELDS = gql`
  fragment ItemRestaurantFields on RestaurantEntity {
    id
    name
    coverImg
    address
    ownerId
  }
`;
