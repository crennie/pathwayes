import agent from '../agent'

import {
  FORM_SUBMIT_API,
  FORM_SUBMIT_API_FULFILLED,
  FORM_SUBMIT_API_REJECTED,
  FORM_COMMIT
} from './actionTypes'

export function submitApiForm(exploration_id, form_data) {
  const userExplorationId = exploration_id;
  return {
    type: FORM_SUBMIT_API,
    // TODO: Add user exploration id from somewhere
    payload: agent.Exploration.update({ userExplorationId, form_data })
  }
}

export function submitApiFormSuccess(response_data) {
  return {
    type: FORM_SUBMIT_API_FULFILLED,
    payload: response_data
  };
}

export function submitApiFormError(error) {
  console.log(error)
  return {
    type: FORM_SUBMIT_API_REJECTED,
    payload: error
  };
}

export function commitFormToStore(exploration_data) {
  return {
    type: FORM_COMMIT,
    payload: exploration_data
  }
}

// TODO: Any submitForm data?
export function submitApiData(exploration_id, form_data) {
  return (dispatch) => {
    return dispatch(submitApiForm(exploration_id, form_data))
      .then(result => {
        result = {
          payload: {
            data: {
              user_code: 'abc123',
              foo: 'bar'
            }
          }
        }
        
        console.log(result)
        if (result.payload.response && result.payload.response.status !== 200) {
          dispatch(submitApiFormError(result.payload.response.data));
        } else {
          // TODO: How to parse data?
          dispatch(commitFormToStore(Object.assign({}, form_data, result.payload.data)))
          dispatch(submitApiFormSuccess(result.payload.data))
        }
      })
      .catch((err) => console.log('err:', err))
  }
}

