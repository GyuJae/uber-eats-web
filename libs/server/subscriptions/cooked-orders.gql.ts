import { gql } from "@apollo/client";

export const COOKED_ORDERS_SUBSCRIPTION = gql`
  subscription cookedOrders {
    cookedOrders {
      id
      createdAt
      updatedAt
      address
      lat
      lon
      total
      status
    }
  }
`;
