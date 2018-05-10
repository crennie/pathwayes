import {
  EXPLORATION_CREATE_FULFILLED,
  FORM_COMMIT,
  EXPLORATION_CREATE_PENDING,
  EXPLORATION_CREATE_REJECTED,


  // Try new apollo client ones:
  EXPLORATION_CREATED
} from '../actions/actionTypes'

const INITIAL_EXPLORATION_STATE = {
  userExplorationId: null,
  domainId: null,
  acceptedTerms: null,
  accessCode: null,
  organizationId: null,
  explorationCompletionDate: null,
  modifiedDate: null,
  createdDate: null,

  // TODO: Should include all page information here
};

export default (state = INITIAL_EXPLORATION_STATE, action) => {
  let error, to_return
  switch (action.type) {
    case EXPLORATION_CREATED:
      return {
        ...state,
        ...action.payload,
        createdDate: new Date()
      }


    case EXPLORATION_CREATE_FULFILLED:
      to_return = action.payload && action.payload.data ? {
          ...state,
          ...action.payload.data,
          is_loaded: true,
          is_loading: false
        } : { ...state }
      return to_return
    case EXPLORATION_CREATE_PENDING:
      return {
        ...state,
        is_loaded: false,
        is_loading: true
      }
    case EXPLORATION_CREATE_REJECTED:
      return {
        ...state,
        is_loaded: false,
        is_loading: false
      }
    case FORM_COMMIT: {
      // TODO: Every form success, maybe parse back "form" data into exploration state??
      if (action.payload) {
        action.payload = action.payload && action.payload.data || {}
        to_return = {
          ...state,
          ...action.payload.data
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