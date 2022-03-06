import { gql } from "@apollo/client";

export const GET_ORDERS_QUERY = gql`
  query getOrders($input: GetOrdersInput!) {
    getOrders(input: $input) {
      ok
      error
      orders {
        id
        createdAt
        updatedAt
        driverId
        clientId
        restaurantId
        total
        status
      }
    }
  }
`;
