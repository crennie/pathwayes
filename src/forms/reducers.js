import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import {
  EXPLORATION_PAGE_TERMS_SELECTION,
  EXPLORATION_PAGE_TERMS_COMPLETE,
  EXPLORATION_PAGE_UNLOAD
} from './actionTypes'

const INITIAL_FORM_STATE = {
  name: null,
  has_next: false,
  has_back: false,
  is_finish: false,
  error: null
};

const CurrentFormReducer = (state = INITIAL_FORM_STATE, action) => {
  let error;
  switch (action.type) {
    case EXPLORATION_PAGE_TERMS_SELECTION:
      return {
        ...state,
        name: EXPLORATION_PAGE_TERMS_SELECTION,
        has_next: true,
        has_back: false,
        is_finish: false,
        error: null,
        loading: false
      }
    case EXPLORATION_PAGE_TERMS_COMPLETE:
      return {
        ...state,
        name: EXPLORATION_PAGE_TERMS_COMPLETE,
        has_next: false,
        has_back: true,
        is_finish: false,
        error: null,
        loading: false
      }
    case EXPLORATION_PAGE_UNLOAD:
      return {
        ...state,
        name: null,
        has_next: false,
        has_back: false,
        is_finish: false,
        error: null,
        loading: false
      }

    default:
      return state;
  }
}


export default combineReducers({
  form: formReducer,
  // Keep reference to the "current form" which we can validate from anywhere
  currentForm: CurrentFormReducer
})