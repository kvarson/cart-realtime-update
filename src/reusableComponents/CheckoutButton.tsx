"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/app/stateManagement/CartContext";
import { useRouter } from "next/navigation";

const CheckoutButton: React.FC = () => {
  const { agreedToChanges } = useCart();
  const router = useRouter();
  const handleCheckout = () => {
    if (!agreedToChanges) {
      return;
    }
    router.push("/checkout");
  };
  return (
    <div>
      <div className='space-y-2'>
        <Button
          onClick={handleCheckout}
          disabled={!agreedToChanges}
          className=' bg-green-500 text-white'
        >
          Checkout
        </Button>
        {!agreedToChanges && (
          <p className='text-red-500 text-sm'>{!agreedToChanges}</p>
        )}
      </div>
    </div>
  );
};

export default CheckoutButton;
