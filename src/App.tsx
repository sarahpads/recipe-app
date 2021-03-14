import React from "react";
import { BrowserRouter, useHistory } from "react-router-dom"
import { AppState, Auth0Provider } from "@auth0/auth0-react";

import AuthorizedApolloProvider from "./AuthorizedApolloProvider";
import Layout from "./Layout/Layout";

export const config = {
  domain: process.env.REACT_APP_AUTH0_DOMAIN as string,
  clientId: process.env.REACT_APP_AUTH0_CLIENT_ID as string,
  audience: process.env.REACT_APP_AUTH0_AUDIENCE,
  redirectUri: window.location.origin as string
}

function App() {
  const history = useHistory()

  function onRedirectCallback(appState: AppState) {
    console.log(appState)
    history.push(
      appState?.returnTo || window.location.pathname
    );
  };

  return (
    <BrowserRouter>
      <Auth0Provider {...config} onRedirectCallback={onRedirectCallback}>
        <AuthorizedApolloProvider>
          <Layout/>
        </AuthorizedApolloProvider>
      </Auth0Provider>
    </BrowserRouter>
  );
}

export default App;
