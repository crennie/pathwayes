import {
  EXPLORATION_PAGE_TERMS_SELECTION,
  FORM_COMMIT
} from '../actions/actionTypes'

const INITIAL_EXPLORATION_STATE = {
  terms_accepted: false
};

export default (state = INITIAL_EXPLORATION_STATE, action) => {
  let error, to_return
  console.log(action)
  switch (action.type) {
    case FORM_COMMIT: {
      // TODO: Every form success, maybe parse back "form" data into exploration state??
      if (action.payload) {
        action.payload = action.payload || {}
        to_return = {
          ...state,
          ...action.payload
        }
      } else {
        to_return = { ...state }
      }
      return to_return
    }
    default:
      return state;
  }
}