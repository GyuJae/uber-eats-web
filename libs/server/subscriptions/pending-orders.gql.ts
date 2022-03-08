import { gql } from "@apollo/client";

export const PENDING_ORDERS_SUBSCRIPTION = gql`
  subscription pendingOrders {
    pendingOrders {
      id
      client {
        id
        email
      }
      total
      orderItems {
        id
        dish {
          name
        }
        selectOptionChoices {
          option {
            id
            name
          }
          choice {
            id
            name
          }
        }
      }
    }
  }
`;
