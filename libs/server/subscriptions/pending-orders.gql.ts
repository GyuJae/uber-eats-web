import { gql } from "@apollo/client";

export const PENDING_ORDERS_SUBSCRIPTION = gql`
  subscription pendingOrders {
    pendingOrders {
      id
      createdAt
      updatedAt
      status
      total
      restaurant {
        id
        name
      }
      client {
        id
        email
      }
    }
  }
`;
