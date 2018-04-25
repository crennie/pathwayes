import {
  APP_LOADED,
  REDIRECT,

  DOMAIN_FETCH_FULFILLED,
  FORM_SUBMIT_API_FULFILLED,
  DOMAIN_FETCH_ANIMATE_COMPLETE
} from '../actions/actionTypes'

const INITIAL_COMMON_STATE = {
  appLoaded: false
};

export default (state = INITIAL_COMMON_STATE, action) => {
  let to_return
  switch (action.type) {
    case APP_LOADED:
      return {
        ...state,
        appLoaded: true
      }
    case DOMAIN_FETCH_ANIMATE_COMPLETE:
      to_return = action.payload ? {
        ...state,
        redirectTo: `/exploration/${action.payload.user_code}/terms`
      } : { ...state }
      return to_return
    case FORM_SUBMIT_API_FULFILLED:
      to_return = action.payload ? {
        ...state,
        redirectTo: `/exploration/${action.payload.user_code}/end`
      } : { ...state }
      return to_return
    case REDIRECT:
      return { ...state, redirectTo: null };
    default:
      return state;
  }
};