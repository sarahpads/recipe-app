import React from "react"

import Home from "../Home/Home";
import Header from "./Header"

const Layout: React.FC = () => {
  return (
    <React.Fragment>
      <Header/>
      <Home />
    </React.Fragment>
  )
}

export default Layout