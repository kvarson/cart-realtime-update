import {
  ADD_ITEM,
  REMOVE_ITEM,
  UPDATE_ITEM_QUANTITY,
} from "@/graphql/mutations";
import { GET_CART } from "@/graphql/queries";
import { Cart, CartContextType } from "@/types/interfaces";
import { useMutation, useQuery } from "@apollo/client";
import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { useAuth } from "./AuthContext";
const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [addItem] = useMutation(ADD_ITEM);
  const [removeItem] = useMutation(REMOVE_ITEM);
  const [updateQuantity] = useMutation(UPDATE_ITEM_QUANTITY);
  const { isRegistered } = useAuth();

  const [cart, setCart] = useState<Cart | null>(null);
  const { data, loading } = useQuery(GET_CART, {
    skip: !isRegistered,
  });
  useEffect(() => {
    if (data?.getCart) {
      setCart(data.getCart);
    }
    console.log(data, "DATA");
  }, [cart?.items, data]);

  const addToCart = async (
    productId: string,
    quantity: number
  ): Promise<string | undefined> => {
    try {
      const itemExists = cart?.items?.some(
        (item) => item.product._id === productId
      );

      if (itemExists) {
        return "Item already in the Cart";
      }
      const { data } = await addItem({
        variables: { productId, quantity },
      });
      if (data?.addItem) {
        setCart(data.addItem.items);
      }
      return "Added Item to the Cart";
    } catch (error) {
      console.log("Error adding item to cart:", error);
      return "Error adding item to the cart. Please try again.";
    }
  };

  const removeFromCart = async (cartItemId: string) => {
    try {
      const { data } = await removeItem({ variables: { cartItemId } });
      if (data?.removeItem) {
        setCart(data.removeItem);
      }
    } catch (error) {
      console.log("Error removing item:", error);
    }
  };
  const updateCartItemQuantity = async (
    cartItemId: string,
    quantity: number
  ) => {
    try {
      const { data } = await updateQuantity({
        variables: { cartItemId, quantity },
      });

      if (data?.updateItemQuantity) {
        setCart(data.updateItemQuantity); // Update the cart state with the new cart data
      }
    } catch (error) {
      console.log("inside catch block(should not be)");
      // console.error("Error updating quantity:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
