import { combineReducers } from 'redux'

import auth   from './auth'
import groups from './groups'
import ui     from './ui'
import payments     from './payments'

import { reducer as formReducer } from 'redux-form'

export default combineReducers({
  auth,
  groups,
  payments,
  ui,
  form: formReducer
})