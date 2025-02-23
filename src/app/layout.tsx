"use client";

import { ApolloProvider } from "@apollo/client";
import client from "../../libs/apollo-client";
import "./globals.css";
import { CartProvider } from "./cartStateManagement/CartContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <ApolloProvider client={client}>
          <CartProvider>{children}</CartProvider>
        </ApolloProvider>
        ;
      </body>
    </html>
  );
}
