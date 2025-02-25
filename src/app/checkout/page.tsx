"use client";
import Navigation from "@/reusableComponents/navigation";
import { useEffect } from "react";
import { useCart } from "../stateManagement/CartContext";
const Checkout = () => {
  const { clearCartItems } = useCart();
  useEffect(() => {
    setTimeout(async () => {
      await clearCartItems();
    }, 0);
  }, []);
  return (
    <div>
      <div className='flex flex-col items-center gap-5 mx-auto p-4 text-center'>
        <Navigation></Navigation>

        <h2 className='text-2xl font-bold'>Products have been ordered </h2>
      </div>
    </div>
  );
};

export default Checkout;
