import { ApolloClient, InMemoryCache, NormalizedCacheObject, ApolloLink, createHttpLink } from "@apollo/client"
import { setContext } from "@apollo/link-context"

export function getApolloClient(): ApolloClient<NormalizedCacheObject> {
  const authLink = setContext(({ headers }: any) => {
    return {
      headers: {
        ...headers,
        "recipe-app-user": "test man"
      }
    };
  });

  // handle the actual HTTP request
  const httpLink = createHttpLink({ uri: "http://localhost:6006" })

  // specify the links in the order that they should be executed
  const link = ApolloLink.from([
    authLink, httpLink
  ])


  return new ApolloClient({
    link,
    cache: new InMemoryCache(),
    connectToDevTools: process.env.NODE_ENV === "development"
  })
}
