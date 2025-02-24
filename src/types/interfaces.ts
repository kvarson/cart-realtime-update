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
  quantity: number;
  children?: React.ReactNode;
}

export interface CartItem {
  _id: string;
  cartId: string;
  product: Product;
  quantity: number;
  updatedAt: string;
  addedAt: string;
}

export interface Cart {
  _id: string;
  hash: string;
  items: CartItem[];
}

export interface CartContextType {
  cart: Cart | null;
  loading: boolean;
  addToCart: (
    productId: string,
    quantity: number
  ) => Promise<string | undefined>;
  removeFromCart: (cartItemId: string) => Promise<void>;
  updateCartItemQuantity: (
    cartItemId: string,
    quantity: number
  ) => Promise<void>;
}
