"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cartAddItemSchema } from "@/app/validations/validation"; // Import your schema
import { AddToCartProps } from "@/types/interfaces";

const AddToCartButton: React.FC<AddToCartProps> = ({
  productId,
  availableQuantity,
}) => {
  const [error, setError] = useState<string | null>(null);

  const handleAddToCart = () => {
    const validationResult = cartAddItemSchema.safeParse({
      productId,
      quantity: availableQuantity,
    });
    if (!validationResult.success) {
      setError(validationResult.error.errors[0].message);
      return;
    }

    setError(null);

    console.log("Adding to cart:", { productId, availableQuantity });
  };

  return (
    <div className='space-y-2'>
      <Button onClick={handleAddToCart}>Add To Cart</Button>
      {error && <p className='text-red-500 text-sm'>{error}</p>}
    </div>
  );
};

export default AddToCartButton;
