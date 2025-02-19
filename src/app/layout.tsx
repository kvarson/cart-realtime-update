"use client";

import { ApolloProvider } from "@apollo/client";
import client from "../../libs/apollo-client";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <ApolloProvider client={client}>{children}</ApolloProvider>;
      </body>
    </html>
  );
}
