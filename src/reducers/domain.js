import {
  DOMAIN_FETCH_PENDING,
  DOMAIN_FETCH_FULFILLED,
  DOMAIN_FETCH_REJECTED,
  DOMAIN_FETCH_ANIMATE,
  DOMAIN_FETCH_ANIMATE_COMPLETE
} from '../actions/actionTypes'

const INITIAL_DOMAIN_STATE = {
  user_code: null,
  domain_id: null,
  created_date: null,
  error: null,
  loading: true,
  post_load_animating: false
};

export default (state = INITIAL_DOMAIN_STATE, action) => {
  let error;
  switch (action.type) {
    case DOMAIN_FETCH_PENDING:
      return {
        ...state,
        user_code: null,
        domain_id: null,
        created_date: null,
        error: null,
        loading: true,
        post_load_animating: false
      }
    case DOMAIN_FETCH_FULFILLED:
      const to_return = action.payload ? {
          ...state,
          user_code: action.payload.user_code,
          domain_id: action.payload.domain_id,
          created_date: action.payload.created_date,
          error: null,
          loading: false,
          post_load_animating: false
        } : { ...state }
        return to_return
    case DOMAIN_FETCH_REJECTED:
      error = action.payload || {message: action.payload.message} 
      return {
        ...state,
        user_code: null,
        domain_id: null,
        created_date: null,
        error: error,
        loading: false,
        post_load_animating: false
      }
    case DOMAIN_FETCH_ANIMATE:
      return {
        ...state,
        error: null,
        loading: false,
        post_load_animating: true
      }
    case DOMAIN_FETCH_ANIMATE_COMPLETE:
      return {
        ...state,
        error: null,
        loading: false,
        post_load_animating: false
      }
    default:
      return state;
  }
}