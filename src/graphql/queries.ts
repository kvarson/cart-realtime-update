import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      _id
      title
      cost
      availableQuantity
      isArchived
      createdAt
      updatedAt
    }
    total
  }
`;
