import { useCart } from "../stateManagement/CartContext";
import { useSubscription } from "@apollo/client";
import { CART_ITEM_UPDATE } from "@/graphql/subscriptions"; // Your GraphQL subscription query
import { CartItem } from "@/types/interfaces";
import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import client from "../../../libs/apollo-client";

const CartSubscriptionHandler = () => {
  const { cart, updateCartItem, refetch } = useCart();

  const [messageFromSubscription, setMessageFromSubscription] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const { data, loading, error } = useSubscription(CART_ITEM_UPDATE, {
    onSubscriptionData: async ({ subscriptionData }) => {
      if (subscriptionData) {
        const { event, payload } = subscriptionData.data.cartItemUpdate;

        console.log(event, "event");
        console.log(subscriptionData, "SUBSCRIPTION DATA");

        if (event === "ITEM_OUT_OF_STOCK") {
          const itemTitle = cart?.items.find((item) => item._id === payload._id)
            ?.product.title;
          // await removeFromCart(payload._id);
          setMessageFromSubscription(
            `${itemTitle} Item removed from the cart due to out-of-stock `
          );
          setOpenDialog(true);
        }

        if (event === "ITEM_QUANTITY_UPDATED") {
          const cartItem = cart?.items.find(
            (item: CartItem) => item._id === payload._id
          );

          const cartItemTitle = cartItem?.product.title;
          if (cartItem) {
            updateCartItem(payload._id, payload.quantity);
            setMessageFromSubscription(
              `${cartItemTitle} Item quantity updated in the cart`
            );
            setOpenDialog(true);
          }
        }

        refetch();
      }
    },
  });

  if (loading) return <p>Loading...</p>; // using while developing
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent>
          <DialogTitle>Cart Update</DialogTitle>
          <DialogDescription>{messageFromSubscription}</DialogDescription>
          <DialogClose onClick={() => setOpenDialog(false)}>Close</DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CartSubscriptionHandler;
