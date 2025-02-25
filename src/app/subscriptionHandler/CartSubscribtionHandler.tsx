import { useCart } from "../stateManagement/CartContext";
import { useSubscription } from "@apollo/client";
import { CART_ITEM_UPDATE } from "@/graphql/subscriptions"; // Your GraphQL subscription query
import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";
const CartSubscriptionHandler = () => {
  const { cart, updateCartItem, refetch, setAgreedToChanges } = useCart();
  const [messages, setMessages] = useState<string[]>([]);
  const [openDialog, setOpenDialog] = useState(false);

  useSubscription(CART_ITEM_UPDATE, {
    onSubscriptionData: async ({ subscriptionData }) => {
      if (!subscriptionData?.data?.cartItemUpdate) return;

      console.log(subscriptionData, "SUBSCRIPTION DATA");
      const { event, payload } = subscriptionData.data.cartItemUpdate;
      if (!payload?._id) {
        console.warn("Missing payload ID in subscription");
        return;
      }
      let newMessage = "";
      const itemTitle = cart?.items?.find((item) => item._id === payload._id)
        ?.product?.title;

      if (event === "ITEM_OUT_OF_STOCK") {
        newMessage = `${
          itemTitle || "An item"
        } was removed due to being out of stock.`;
      } else if (event === "ITEM_QUANTITY_UPDATED") {
        newMessage = `${itemTitle || "An item"} quantity was updated to ${
          payload.quantity
        }.`;
        updateCartItem(payload._id, payload.quantity);
      }

      if (newMessage) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setOpenDialog(true);
      }

      refetch();
    },
    onError: (error) => {
      console.error("Subscription error:", error);
    },
  });

  if (!messages.length) return null;
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent>
        <DialogTitle>Cart Updates</DialogTitle>
        <DialogDescription>
          There has been a changes to your cart items
        </DialogDescription>
        <div>
          <ul>
            {messages.map((msg, index) => (
              <li key={index}>{msg}</li>
            ))}
          </ul>
        </div>
        <DialogClose onClick={() => setAgreedToChanges(true)}>
          I Agree
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default CartSubscriptionHandler;
