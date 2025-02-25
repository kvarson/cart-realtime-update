"use client";

import Image from "next/image";
import { useQuery, useMutation, gql } from "@apollo/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GET_PRODUCTS } from "@/graphql/queries";
import { useEffect, useState } from "react";
import { GetProductsData, Product } from "@/types/interfaces";
import Navigation from "@/reusableComponents/navigation";
import AddToCartButton from "@/reusableComponents/addToCartButton";
export default function Home() {
  const { data, loading, error } = useQuery<GetProductsData>(GET_PRODUCTS);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (data && data.getProducts) {
      setProducts(data.getProducts.products);
    }
  }, [data]);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <div className='w-full container mx-auto px-4 py-8'>
        <Navigation></Navigation>
      </div>
      <div className='container mx-auto px-4 py-8'>
        <h1 className='text-3xl font-bold mb-6 text-center'>Product List</h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          {products.map((product: Product) => (
            <Card key={product._id} className='shadow-md'>
              <CardHeader>
                <CardTitle>{product.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Cost: ${product.cost}</p>
                <p>Available: {product.availableQuantity}</p>
                <p>Status: {product.isArchived ? "Archived" : "Active"}</p>
                {product.availableQuantity && (
                  <AddToCartButton productId={product._id} quantity={1}>
                    Add To Cart
                  </AddToCartButton>
                )}
                {!product.availableQuantity && <p>Product out of stock</p>}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
