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
import { usePathname } from "next/navigation";
const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [addItem] = useMutation(ADD_ITEM);
  const [removeItem] = useMutation(REMOVE_ITEM);
  const [updateQuantity] = useMutation(UPDATE_ITEM_QUANTITY);
  const { isRegistered } = useAuth();
  const [cart, setCart] = useState<Cart | null>(null);

  const [agreedToChanges, setAgreedToChanges] = useState(true);

  const pathname = usePathname();
  const { data, loading, refetch } = useQuery(GET_CART, {
    skip: !isRegistered || pathname === "/checkout",
  });
  useEffect(() => {
    if (data?.getCart) {
      setCart(data.getCart);
    }
  }, [data]);

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
        setCart(data.addItem);
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
      console.log(error);
      // console.error("Error updating quantity:", error);
    }
  };

  const updateCartItem = (itemId: string, quantity: number) => {
    setCart((prevCart) => {
      if (!prevCart) return prevCart;

      const updatedItems = prevCart.items.map((item) =>
        item._id === itemId ? { ...item, quantity } : item
      );
      console.log(updatedItems, "inside update");
      return { ...prevCart, items: updatedItems };
    });
  };

  const clearCartItems = async () => {
    if (cart?.items?.length) {
      try {
        cart?.items?.map(async (item) => {
          if (item._id) {
            await removeFromCart(item._id);
          }
        });
        refetch();
        console.log("All items have been removed from the cart.");
      } catch (error) {
        console.log("Error clearing the cart:", error);
      }
    } else {
      console.log("Cart is already empty.");
    }
  };
  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addToCart,
        removeFromCart,
        updateCartItem,
        updateCartItemQuantity,
        refetch,
        setAgreedToChanges,
        agreedToChanges,
        clearCartItems,
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
