// TODO: This is only for other apps.  Replace with code specific to own App

import agent from '../agent'

import {
  DOMAIN_FETCH,
  DOMAIN_FETCH_FULFILLED,
  DOMAIN_FETCH_REJECTED,
} from './actionTypes'

export function getDomain() {
  return {
    type: DOMAIN_FETCH,
    payload: agent.fakeLoad(5000)
  }
}

export function getDomainSuccess(domain_data) {
  console.log(domain_data)
  return {
    type: DOMAIN_FETCH_FULFILLED,
    payload: domain_data
  };
 }

export function getDomainError(error) {
  return {
    type: DOMAIN_FETCH_REJECTED,
    payload: error
  };
 }

export function fetchDomain(domainId) {
  console.log('fetch domain! outer')
  return (dispatch) => {
    console.log('fetch domain! inner')
    return dispatch(getDomain(domainId))
      .then(result => {
        console.log("fetch domain, promiseThen");
        const user_code = 'abc123'
        result = {
          payload: {
            data: {
              user_code,
              domain_id: '123',
              created_date: new Date()
            }
          }
        }
        // Note: Error's "data" is in result.payload.response.data (inside "response")
        // success's "data" is in result.payload.data
        if (result.payload.response && result.payload.response.status !== 200) {
          return dispatch(getDomainError(result.payload.response.data));
        } else {
          return dispatch(getDomainSuccess(result.payload.data))
        }
      })
      .catch((err) => console.log('err:', err))
  }
}
