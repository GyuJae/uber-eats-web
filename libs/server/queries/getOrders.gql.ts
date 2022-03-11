import { gql } from "@apollo/client";

export const GET_ORDERS_DRIVER = gql`
  query getOrdersForDriver($input: GetOrdersInput!) {
    getOrders(input: $input) {
      ok
      error
      orders {
        id
        address
        lat
        lon
        total
        client {
          email
        }
      }
    }
  }
`;

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
        restaurant {
          id
          name
          ownerId
          address
          coverImg
          categoryId
        }
        orderItems {
          id
          count
          dish {
            id
            name
          }
          selectOptionChoices {
            id
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

export const GET_ORDERS_OWNER_QUERY = gql`
  query getOrdersForOwner($input: GetOrdersInput!) {
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
        orderItems {
          id
          count
          dish {
            id
            name
          }
          selectOptionChoices {
            id
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
        client {
          id
          email
        }
      }
    }
  }
`;
