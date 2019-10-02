import reduxThunk from "redux-thunk"
import reducers from "./reducers"
import { createStore, applyMiddleware, compose } from "redux"
import { glyToken } from "../_helpers"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducers,
  {
    auth: { authenticated: glyToken.getToken() }
  },
  composeEnhancers(applyMiddleware(reduxThunk))
)
export default store
