"use client";

import Image from "next/image";
import { useQuery, useMutation, gql } from "@apollo/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { GET_PRODUCTS } from "@/graphql/queries";
import { REGISTER_MUTATION } from "@/graphql/mutations";
export default function Home() {
  // const { loading, error, data } = useQuery(GET_PRODUCTS);

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-6 text-center'>Product List</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
        {/* {data.products.map((product: any) => (
          <Card key={product.id} className='shadow-md'>
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <Image
                src={product.image}
                alt={product.name}
                className='w-full h-40 object-cover rounded-md mb-3'
              ></Image>
              <p className='text-lg font-semibold'>
                €{product.price.toFixed(2)}
              </p>
              <p className='text-sm text-gray-500'>
                Stock: {product.availableQuantity}
              </p>
              <Button
                className='mt-3 w-full'
                disabled={product.availableQuantity === 0}
                onClick={() => handleAddToCart(product.id, product.name)}
              >
                {product.availableQuantity > 0 ? "Add to Cart" : "Out of Stock"}
              </Button>
            </CardContent>
          </Card>
        ))} */}
      </div>
    </div>
  );
}
