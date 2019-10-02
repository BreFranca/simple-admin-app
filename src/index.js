import React from "react"
import ReactDOM from "react-dom"

import "./_assets/css/app.scss"
import "font-awesome/css/font-awesome.css"

import App from "./App"

import { Provider } from "react-redux"
import store from "./store"

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
)
