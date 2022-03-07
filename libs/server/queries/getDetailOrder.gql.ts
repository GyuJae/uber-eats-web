import { gql } from "@apollo/client";

export const GET_DETAIL_ORDER_QUERY = gql`
  query getDetailOrder($input: GetDetailOrderInput!) {
    getDetailOrder(input: $input) {
      ok
      error
      order {
        id
        orderItems {
          id
          dish {
            id
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
  }
`;
