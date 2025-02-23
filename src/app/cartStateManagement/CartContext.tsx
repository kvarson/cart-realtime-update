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

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data, loading, refetch } = useQuery(GET_CART);
  const [addItem] = useMutation(ADD_ITEM);
  const [removeItem] = useMutation(REMOVE_ITEM);
  const [updateQuantity] = useMutation(UPDATE_ITEM_QUANTITY);

  const [cart, setCart] = useState<Cart | null>(null);

  useEffect(() => {
    if (data?.getCart) {
      setCart(data.getCart);
    }
  }, [data]);

  const addToCart = async (productId: string, quantity: number) => {
    try {
      const { data } = await addItem({ variables: { productId, quantity } });
      if (data?.addItem) {
        setCart(data.addItem);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const removeFromCart = async (cartItemId: string) => {
    try {
      const { data } = await removeItem({ variables: { cartItemId } });
      if (data?.removeItem) {
        setCart(data.removeItem);
      }
    } catch (error) {
      console.error("Error removing item:", error);
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
        setCart(data.updateItemQuantity);
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
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
