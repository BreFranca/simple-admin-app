import { uiConstants } from "../constants"

const initialState = {
  modalStatus: "modalHide",
  alert: null,
  loading: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case uiConstants.MODAL_SHOW:
      return { modalStatus: action.payload }
    case uiConstants.MODAL_HIDE:
      return { modalStatus: action.payload }
    case uiConstants.SET_ALERT:
      return { alert: action.payload }
    case uiConstants.LOADING:
      return { loading: action.payload }
    default:
      return state
  }
}
