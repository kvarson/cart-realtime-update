"use client";
import Navigation from "@/reusableComponents/navigation";
import { useEffect, useState } from "react";
import { useCart } from "../stateManagement/CartContext";
import { useRouter } from "next/navigation";
const Checkout = () => {
  const { clearCartItems } = useCart();
  const [isAllowed, setIsAllowed] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const canAccess = sessionStorage.getItem("canProceedToCheckout") === "true";

    if (!canAccess) {
      router.replace("/");
    } else {
      setIsAllowed(true);
    }

    if (canAccess) {
      setTimeout(async () => {
        await clearCartItems();
      }, 0);
    }
  }, []);

  if (!isAllowed) return null;

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
