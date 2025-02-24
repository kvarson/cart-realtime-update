"use client";

import { ApolloProvider } from "@apollo/client";
import client from "../../libs/apollo-client";
import "./globals.css";
import { CartProvider } from "./stateManagement/CartContext";
import { AuthProvider } from "./stateManagement/AuthContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <ApolloProvider client={client}>
          <AuthProvider>
            <CartProvider>{children}</CartProvider>
          </AuthProvider>
        </ApolloProvider>
        ;
      </body>
    </html>
  );
}
