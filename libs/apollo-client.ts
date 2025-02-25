import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  split,
  from,
} from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { setContext } from "@apollo/client/link/context";
import { getMainDefinition } from "@apollo/client/utilities";
import Cookies from "js-cookie";
const httpLink = new HttpLink({
  uri: "https://take-home-be.onrender.com/api",
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: "wss://take-home-be.onrender.com/api",
    connectionParams: () => ({
      authToken: Cookies.get("token"),
    }),
    on: {
      connected: () => console.log("WebSocket connected successfully"),
      closed: () => console.log("WebSocket closed"),
      error: (err) => console.error("WebSocket Error", err),
    },
  })
);

const authLink = setContext(async (_, { headers }) => {
  const token = Cookies.get("token") || "";
  console.log("token,", token);

  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const httpLinkWithAuth = from([authLink, httpLink]);
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    console.log("Definition:", definition);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLinkWithAuth
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default client;
