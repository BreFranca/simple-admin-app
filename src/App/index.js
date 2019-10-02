import React, { Fragment } from "react"
import HomeRouter from "../routes/HomeRouter"
import GlobalStyle from "../_assets/styles/global"

const App = () => (
  <Fragment>
    <GlobalStyle />
    <HomeRouter />
  </Fragment>
)

export default App
