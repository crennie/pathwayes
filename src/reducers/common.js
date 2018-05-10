import {
  APP_LOADED,
  REDIRECT,


  AUTHORIZE_ACCESS_CODE,
  AUTHORIZE_ACCESS_CODE_FULFILLED,
  AUTHORIZE_ACCESS_CODE_REJECTED,

  EXPLORATION_CREATE_FULFILLED,
  FORM_SUBMIT_API_FULFILLED,
  EXPLORATION_CREATE_ANIMATE_COMPLETE,
  EXPLORATION_CREATE_REJECTED,


  ACCESS_CODE_AUTHORZED,
  BEGIN_EXPLORATION
} from '../actions/actionTypes'

const INITIAL_COMMON_STATE = {
  appLoaded: false,
  token: null
};

export default (state = INITIAL_COMMON_STATE, action) => {
  let to_return
  switch (action.type) {
    case APP_LOADED:
      return {
        ...state,
        appLoaded: true
      }

    case ACCESS_CODE_AUTHORZED:
      console.log(state, action)
      return {
        ...state,
        token: action.payload
      }

    case BEGIN_EXPLORATION:
      console.log(state, action)
      return {
        ...state,
        redirectTo: `/exploration/terms`
      }

    case AUTHORIZE_ACCESS_CODE_FULFILLED:
      return {
        ...state,
        token: action.payload.data.token // TODO: How will we really get token?
      }

    case AUTHORIZE_ACCESS_CODE_REJECTED:
      return {
        redirectTo: `/error.html`
      }

    case EXPLORATION_CREATE_ANIMATE_COMPLETE:
      to_return = action.payload && action.payload.data ? {
        ...state,
        redirectTo: `/exploration/terms`
      } : { ...state }
      return to_return

    case EXPLORATION_CREATE_REJECTED:
      return {
        ...state,
        redirectTo: `/error.html`
      }
    case FORM_SUBMIT_API_FULFILLED:
      to_return = action.payload && action.payload.data ? {
        ...state,
        redirectTo: `/exploration/end`
      } : { ...state }
      return to_return
    case REDIRECT:
      return { ...state, redirectTo: null };
    default:
      return state;
  }
};