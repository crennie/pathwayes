import agent from '../agent'

import {
  FORM_SUBMIT_API,
  FORM_SUBMIT_API_FULFILLED,
  FORM_SUBMIT_API_REJECTED,
  FORM_COMMIT
} from './actionTypes'

export function submitApiForm(form_data) {
  return {
    type: FORM_SUBMIT_API,
    payload: agent.fakeLoad(3000)
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
export function submitApiData(form_data) {
  return (dispatch) => {
    return dispatch(submitApiForm(form_data))
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

