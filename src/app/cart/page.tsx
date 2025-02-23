"use client";
import React, { useState } from "react";
import { useCart } from "../cartStateManagement/CartContext"; // Adjust the import path as needed
import { CartItem } from "@/types/interfaces";

const CartPage: React.FC = () => {
  const { cart, addToCart, removeFromCart, updateCartItemQuantity } = useCart();
  const [error, setError] = useState<string | null>(null);

  if (!cart || cart.items.length === 0) {
    return (
      <div className='container mx-auto p-4 text-center'>
        <h2 className='text-2xl font-bold'>Your Cart is Empty</h2>
        <p className='mt-2'>Add some products to your cart!</p>
      </div>
    );
  }

  const handleRemoveItem = (cartItemId: string) => {
    try {
      removeFromCart(cartItemId);
    } catch (error) {
      setError("Failed to remove item");
    }
  };

  const handleUpdateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      setError("Quantity must be greater than zero");
      return;
    }

    try {
      updateCartItemQuantity(cartItemId, quantity);
    } catch (error) {
      setError("Failed to update quantity");
    }
  };

  return (
    <div className='container mx-auto p-4'>
      <h2 className='text-3xl font-bold mb-6'>Your Cart</h2>

      {error && <p className='text-red-500'>{error}</p>}

      <div className='space-y-6'>
        {cart.items.map((item: CartItem) => (
          <div
            key={item._id}
            className='flex justify-between items-center p-4 border rounded-md shadow-md'
          >
            <div className='flex items-center space-x-4'>
              <div>
                <h3 className='text-lg font-semibold'>{item.product?.title}</h3>
                <p className='text-gray-600'>
                  {item.product?.cost.toFixed(2)} USD
                </p>
                <p className='text-gray-400'>
                  {item.product?.availableQuantity} in stock
                </p>
              </div>
            </div>

            <div className='flex items-center space-x-2'>
              <button
                className='px-2 py-1 bg-blue-500 text-white rounded-md'
                onClick={() =>
                  handleUpdateQuantity(item._id, item.quantity - 1)
                }
                disabled={item.quantity <= 1} // Disable "-" button if quantity is 1
              >
                -
              </button>

              <input
                type='number'
                value={item.quantity}
                min='1'
                onChange={(e) =>
                  handleUpdateQuantity(item._id, parseInt(e.target.value))
                }
                className='w-16 text-center border rounded-md'
                disabled={item.product?.availableQuantity === 0} // Disable input if out of stock
              />

              <button
                className='px-2 py-1 bg-blue-500 text-white rounded-md'
                onClick={() =>
                  handleUpdateQuantity(item._id, item.quantity + 1)
                }
                disabled={item.product?.availableQuantity <= item.quantity} // Disable "+" button if out of stock
              >
                +
              </button>

              <button
                className='px-3 py-1 bg-red-500 text-white rounded-md'
                onClick={() => handleRemoveItem(item._id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className='mt-6 flex justify-between items-center'>
        <div className='text-right'>
          <h3 className='text-lg font-semibold'>Total: </h3>
          <p className='text-2xl font-bold'>
            {cart.items
              .reduce(
                (total, item: CartItem) =>
                  total + item.product.cost * item.quantity,
                0
              )
              .toFixed(2)}{" "}
            USD
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
