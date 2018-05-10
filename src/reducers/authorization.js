import {
  EXPLORATION_CREATE_FULFILLED,
  ACCESS_CODE_LOGIN
} from '../actions/actionTypes'

const INITIAL_AUTHORIZATION_STATE = {
  token: null,
  accessCode: null,

  // Include loader info here
  is_loaded: false,
  is_loading: false
};

export default (state = INITIAL_EXPLORATION_STATE, action) => {
  let error, to_return
  switch (action.type) {
    case EXPLORATION_CREATE_FULFILLED:
      to_return = action.payload && action.payload.data ? {
          ...state,
          ...action.payload.data,
          is_loaded: true,
          is_loading: false
        } : { ...state }
      return to_return
    case EXPLORATION_CREATE_PENDING:
      return
    }
    }