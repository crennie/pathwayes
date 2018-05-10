import { combineReducers } from 'redux'
import common from './common'
import exploration from './exploration'

import currentForm from './currentForm'

import { reducer as formReducer } from 'redux-form'

/* TODO: Should we prime global initial state here as well?  Or is this OK to do in the split up reducers?
const INITIAL_STATE = {
  common: { appLoaded: false }
  domain: { content: false, error: null, loading: false },
};
*/

const reducer = combineReducers({
  common,
  exploration,
  form: formReducer,

  // Keep reference to the "current form" which we can validate from anywhere
  currentForm
})

export default reducer