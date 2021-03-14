import React, { useEffect, useRef } from 'react';
import { ApolloClient, ApolloLink, ApolloProvider, createHttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { setContext } from '@apollo/link-context';
import { useAuth0 } from "@auth0/auth0-react";
import { onError } from '@apollo/link-error';

const AuthorizedApolloProvider: React.FC = ({ children }) => {
  const { getAccessTokenSilently } = useAuth0();
  const client = useRef<ApolloClient<NormalizedCacheObject> | undefined>()

  useEffect(() => {
    const authLink = setContext(async ({ headers }: any) => {
      let token

      // try to get the access token
      // if the user has not logged in, this will fail
      // since we only need the token for some operations, don't force them to login
      try {
        token = await getAccessTokenSilently()
        console.log(token)
      } catch (error) { }

      return {
        headers: {
          ...headers,
          Authorization: token ? `Bearer ${token}` : ''
        }
      };
    });

    const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
      if (!networkError || !graphQLErrors) {
        return
      }

      const isUnauthenticated = graphQLErrors.some((error) => error.message === 'Unauthenticated')

      if (!isUnauthenticated) {
        return
      }

      // if we try to perform an action that requires authentication,
      // prompt them to login/revalidate their session

      return
    })

    // handle the actual HTTP request
    const httpLink = createHttpLink({ uri: "http://localhost:6006" })

    // specify the links in the order that they should be executed
    const link = ApolloLink.from([
      authLink, errorLink, httpLink
    ])

    client.current = new ApolloClient({
      link,
      cache: new InMemoryCache(),
      connectToDevTools: process.env.NODE_ENV === "development"
    })
  }, [getAccessTokenSilently])

  if (!client.current) {
    return <div>Loading Apollo</div>
  }

  return (
    <ApolloProvider client={client.current}>
      {children}
    </ApolloProvider>
  );
};

export default AuthorizedApolloProvider;