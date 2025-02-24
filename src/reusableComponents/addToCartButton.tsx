"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cartAddItemSchema } from "@/app/validations/validation";
import { AddToCartProps } from "@/types/interfaces";
import { useCart } from "@/app/cartStateManagement/CartContext";

const AddToCartButton: React.FC<AddToCartProps> = ({ productId, quantity }) => {
  const [error, setError] = useState<string | null>(null);
  const [displayAddedMessage, setDisplayAddedMessage] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { addToCart, cart } = useCart();
  const handleAddToCart = async () => {
    try {
      setLoading(true);
      const validationResult = cartAddItemSchema.safeParse({
        productId,
        quantity,
      });
      if (!validationResult.success) {
        setError(validationResult.error.errors[0].message);
        return;
      }

      setError(null);
      const message: any = await addToCart(productId, quantity);
      if (message) {
        setLoading(false);
      }
      console.log(message, "message");
      setDisplayAddedMessage(message);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setDisplayAddedMessage("");
    }, 1500);
  }, [displayAddedMessage]);

  return (
    <div>
      <div className='space-y-2'>
        <Button disabled={loading} onClick={handleAddToCart}>
          Add To Cart
        </Button>
        {error && <p className='text-red-500 text-sm'>{error}</p>}
      </div>
      {displayAddedMessage && (
        <p className='text-red-500 text-sm'>{displayAddedMessage}</p>
      )}
    </div>
  );
};

export default AddToCartButton;
