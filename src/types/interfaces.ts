export interface Product {
  _id: string;
  title: string;
  cost: number;
  availableQuantity: number;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GetProductsData {
  getProducts: {
    products: Product[];
    total: number;
  };
}
export interface AddToCartProps {
  productId: string;
  availableQuantity: number;
  children?: React.ReactNode;
}
