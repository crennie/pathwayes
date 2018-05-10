import agent from '../agent'

import {
  AUTHORIZE_ACCESS_CODE,
  AUTHORIZE_ACCESS_CODE_FULFILLED,
  AUTHORIZE_ACCESS_CODE_REJECTED
} from './actionTypes'


export function login(accessCode) {
  return {
    type: AUTHORIZE_ACCESS_CODE,
    payload: accessCode
  }
}

export function loginSuccess(token) {
  return {
    type: AUTHORIZE_ACCESS_CODE_FULFILLED,
    payload: token
  };
 }

export function loginError(error) {
  return {
    type: AUTHORIZE_ACCESS_CODE_REJECTED,
    payload: error
  };
 }

export function accessCodeLogin(accessCode) {
  return (dispatch) => {
    dispatch(login(accessCode))

    /*
    return dispatch(createExploration(domainId))
    */

    return agent.Auth.login({ accessCode }).then( response => {
        console.log("login, promiseThen", response);
        console.log(response)

        // TODO: We need to parse the success / error calls in a more general / better way
        
        // Note: Error's "data" is in result.payload.response.data (inside "response")
        // success's "data" is in result.payload.data
        if (response.statusCode !== 200 || response.body.data.accessCodeLogin === 'Unauthorized') {
          return dispatch(loginError("Unauthorized accessCode"));
        } else {
          return dispatch(loginSuccess(response.body.data.accessCodeLogin))
        }
      })
      .catch((err) => Promise.reject(err))
  }
}
