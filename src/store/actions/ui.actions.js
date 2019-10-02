import { uiConstants } from "../constants"

export const handleModal = props => dispatch => {
  if (props === "modalShow") {
    dispatch({
      type: uiConstants.MODAL_SHOW,
      payload: props
    })
  } else {
    dispatch({
      type: uiConstants.MODAL_HIDE,
      payload: props
    })
  }
}

export const setAlert = (msg, type) => async dispatch => {
  const alert = {
    message: msg,
    type: type
  }

  dispatch({
    type: uiConstants.SET_ALERT,
    payload: alert
  })

  setTimeout(function() {
    dispatch({
      type: uiConstants.SET_ALERT,
      payload: {}
    })
  }, 5000)
}

export const showAlert = (msg, type) => async dispatch => {
  const alert = {
    message: msg,
    type: type
  }

  dispatch({
    type: uiConstants.SET_ALERT,
    payload: alert
  })
}

export const hideAlert = (msg, type) => async dispatch => {
  dispatch({
    type: uiConstants.SET_ALERT,
    payload: {}
  })
}

export const showLoading = () => async dispatch => {
  dispatch({
    type: uiConstants.LOADING,
    payload: true
  })
}

export const hideLoading = () => async dispatch => {
  dispatch({
    type: uiConstants.LOADING,
    payload: false
  })
}