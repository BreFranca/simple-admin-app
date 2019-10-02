import * as types from "../constants"

const initialState = {
  plansData: [],
  lastSubscription: {},
  newPlan: null,
  customerSubscriptions: [],
  customerTransactions: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_PLANS:
      return { ...state, plansData: action.payload }
    case types.SET_NEW_PLAN:
      return { ...state, newPlan: action.payload }
    case types.GET_CUSTOMER_SUBSCRIPTIONS:
      return { ...state, customerSubscriptions: action.payload }
    case types.GET_CUSTOMER_TRANSACTIONS:
      return { ...state, customerTransactions: action.payload }
    case types.LAST_SIGNATURE:
      return { ...state, lastSubscription: action.payload }
    default:
      return state
  }
}
