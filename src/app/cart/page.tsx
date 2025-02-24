"use client";
import React, { useEffect, useState } from "react";
import { useCart } from "../stateManagement/CartContext"; // Adjust the import path as needed
import { CartItem } from "@/types/interfaces";
import {
  cartRemoveItemSchema,
  cartUpdateItemQuantitySchema,
} from "../validations/validation";
import { Button } from "@/components/ui/button";
import Navigation from "@/reusableComponents/navigation";

const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateCartItemQuantity, loading } = useCart();
  const [error, setError] = useState<string | null>(null);

  const [loadingRemove, setLoadingRemove] = useState(false);
  const [deleteValidationError, setDeleteValidationError] = useState<
    string | null
  >(null);
  const [updateValidationError, setUpdateValidationError] = useState<
    string | null
  >(null);
  const handleRemoveItem = async (cartItemId: string) => {
    try {
      setLoadingRemove(true);

      const validationResult = cartRemoveItemSchema.safeParse({
        cartItemId,
      });
      if (!validationResult.success) {
        setDeleteValidationError(validationResult.error.errors[0].message);
        return;
      }
      await removeFromCart(cartItemId);
      setLoadingRemove(false);
    } catch (error) {
      console.log(error);
      setLoadingRemove(false);
      setError("Failed to remove item");
    }
  };

  const handleUpdateQuantity = (
    cartItemId: string,
    quantity: number,
    availableQuantity: number,
    item: CartItem
  ) => {
    console.log(availableQuantity, "availableQuantity");
    console.log(quantity, "quantity");
    console.log(item, "CartItem");
    if (quantity <= 0) {
      setUpdateValidationError("Quantity must be greater than zero");
      return;
    }

    if (availableQuantity < quantity) {
      return;
    }
    if (availableQuantity !== undefined && quantity > availableQuantity) {
      setUpdateValidationError(`Only ${availableQuantity} items are available`);
      return;
    }

    try {
      const validationResult = cartUpdateItemQuantitySchema.safeParse({
        cartItemId,
        quantity,
      });

      if (!validationResult.success) {
        setUpdateValidationError(validationResult.error.errors[0].message);
        return;
      }

      updateCartItemQuantity(cartItemId, quantity);
      setUpdateValidationError("");
    } catch (error) {
      setError("Failed to update quantity");
    }
  };

  if (loading) return <p>Loading cart...</p>;
  if (!cart || cart?.items?.length === 0) {
    return (
      <div className='container mx-auto p-4 text-center'>
        <Navigation></Navigation>
        <h2 className='text-2xl font-bold'>Your Cart is Empty</h2>
        <p className='mt-2'>Add some products to your cart!</p>
      </div>
    );
  }
  return (
    <div className='container mx-auto p-4'>
      <div className='w-full mb-2'>
        <Navigation></Navigation>
      </div>
      <h2 className='text-3xl font-bold mb-6'>Your Cart</h2>
      {error && <p className='text-red-500'>{error}</p>}

      <div className='space-y-6'>
        {cart &&
          cart.items.map((item: CartItem) => (
            <div
              key={item._id}
              className='flex justify-between items-center p-4 border rounded-md shadow-md'
            >
              <div className='flex items-center space-x-4'>
                <div>
                  <h3 className='text-lg font-semibold'>
                    {item.product?.title}
                  </h3>
                  <p className='text-gray-600'>
                    {item.product?.cost.toFixed(2)} USD
                  </p>
                  <p className='text-gray-400'>
                    {item.product?.availableQuantity} in stock
                  </p>
                </div>
              </div>

              <div className='flex items-center space-x-2'>
                <Button
                  className='px-2 py-1 bg-blue-500 text-white rounded-md'
                  onClick={() =>
                    handleUpdateQuantity(
                      item._id,
                      item.quantity,
                      item.product.availableQuantity,
                      item
                    )
                  }
                  disabled={item.quantity <= 1}
                >
                  -
                </Button>

                <input
                  type='number'
                  value={item.quantity}
                  min='1'
                  max={item.product.availableQuantity}
                  onChange={(e) => {
                    const newQuantity = parseInt(e.target.value, 10);
                    if (!isNaN(newQuantity)) {
                      handleUpdateQuantity(
                        item._id,
                        newQuantity,
                        item.product.availableQuantity,
                        item
                      );
                    }
                  }}
                  className='w-16 text-center border rounded-md'
                />
                {updateValidationError && (
                  <p className='text-red-500'>{updateValidationError}</p>
                )}
                <Button
                  className='px-2 py-1 bg-blue-500 text-white rounded-md'
                  onClick={() =>
                    handleUpdateQuantity(
                      item._id,
                      item.quantity,
                      item.product.availableQuantity,
                      item
                    )
                  }
                  disabled={item.quantity - 1 >= item.product.availableQuantity} // Prevent increasing beyond stock
                >
                  +
                </Button>

                {deleteValidationError && (
                  <p className='text-red-500'>{deleteValidationError}</p>
                )}
                <Button
                  className='px-3 py-1 bg-red-500 text-white rounded-md'
                  disabled={loadingRemove}
                  onClick={() => handleRemoveItem(item._id)}
                >
                  Remove
                </Button>
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
