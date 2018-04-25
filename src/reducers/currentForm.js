import {
  EXPLORATION_PAGE_TERMS_SELECTION,
  EXPLORATION_PAGE_TERMS_COMPLETE,
  EXPLORATION_PAGE_UNLOAD,
  
  FORM_SUBMIT_API_PENDING,
  FORM_SUBMIT_API_FULFILLED,
  FORM_SUBMIT_API_REJECTED
} from '../actions/actionTypes'

const INITIAL_FORM_STATE = {
  name: null,
  has_next: false,
  has_back: false,
  is_finish: false,
  error: null
};

export default (state = INITIAL_FORM_STATE, action) => {
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
    
    case FORM_SUBMIT_API_PENDING:
      return {
        ...state,
        error: null,
        loading: true
      }
    case FORM_SUBMIT_API_FULFILLED:
      const to_return = action.payload ? {
          ...state,
          error: null,
          user_code: null,
          loading: false
        } : { ...state }
        return to_return
    case FORM_SUBMIT_API_REJECTED:
      error = action.payload || {message: action.payload.message} 
      return {
        ...state,
        error: error,
        loading: false
      }
    default:
      return state;
  }
}