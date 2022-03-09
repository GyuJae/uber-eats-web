import { gql } from "@apollo/client";

export const UPDATE_ORDER_SUBSCRIPTION = gql`
  subscription updateOrder($input: UpdateOrderInput!) {
    updateOrder(input: $input) {
      id
      status
    }
  }
`;
