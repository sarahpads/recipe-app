import React, { useRef } from "react";
import { BrowserRouter } from "react-router-dom"
import { ApolloProvider } from "@apollo/client";

import { getApolloClient } from "./utils.apollo";
import Home from "./Home/Home";

function App() {
  const client = useRef(getApolloClient())

  return (
    <BrowserRouter>
      <ApolloProvider client={client.current}>
        <Home/>
      </ApolloProvider>
    </BrowserRouter>
  );
}

export default App;
