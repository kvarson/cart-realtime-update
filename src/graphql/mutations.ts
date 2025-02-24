import { gql } from "@apollo/client";

export const REGISTER_MUTATION = gql`
  mutation Register {
    register {
      _id
      token
      cartId
      isActive
      createdAt
      updatedAt
    }
  }
`;

export const ADD_ITEM = gql`
  mutation AddToCart($productId: ID!, $quantity: Int!) {
    addItem(input: { productId: $productId, quantity: $quantity }) {
      _id
      items {
        _id
        product {
          _id
          title
          cost
          availableQuantity
        }
        quantity
      }
    }
  }
`;

export const REMOVE_ITEM = gql`
  mutation RemoveFromCart($cartItemId: ID!) {
    removeItem(input: { cartItemId: $cartItemId }) {
      _id
      items {
        _id
        product {
          _id
          title
          cost
        }
        quantity
      }
    }
  }
`;

export const UPDATE_ITEM_QUANTITY = gql`
  mutation UpdateCartItemQuantity($cartItemId: ID!, $quantity: Int!) {
    updateItemQuantity(
      input: { cartItemId: $cartItemId, quantity: $quantity }
    ) {
      _id
      items {
        _id
        product {
          _id
          title
          cost
          availableQuantity
          isArchived
          createdAt
          updatedAt
        }
        quantity
      }
    }
  }
`;
