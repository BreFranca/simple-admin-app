import * as types from "../constants"

const initialState = {
  validation: "",
  authenticated: "",
  remember: false,
  errorMessage: "",
  listGroups: "",
  userLogged: {
    _id: null,
    email: '',
    phone: ''
  },
  customer: {}
}

export default function(state = initialState, action) {
  switch (action.type) {
    case types.AUTH_USER:
      return { ...state, authenticated: action.payload, errorMessage: "" }
    case types.AUTH_ERR:
      return { ...state, errorMessage: action.payload }
    case types.AUTH_REMEMBER:
      return { ...state, remember: action.payload }
    case types.AUTH_GROUPS:
      return { ...state, listGroups: action.payload }
    case types.AUTH_TOKEN:
      return { ...state, validation: action.payload }
    case types.SET_USER:
      return { ...state, userLogged: action.payload }
      case types.GET_CUSTOMER:
        return { ...state, customer: action.payload }
    default:
      return state
  }
}
