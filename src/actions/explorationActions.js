import agent from '../agent'

import {
  EXPLORATION_CREATE,
  EXPLORATION_CREATE_FULFILLED,
  EXPLORATION_CREATE_REJECTED,

  BEGIN_EXPLORATION
} from './actionTypes'

export function beginExploration() {
  return {
    type: BEGIN_EXPLORATION
  }
}

export function createExploration(domainId) {
  return {
    type: EXPLORATION_CREATE,
    /*
    payload: agent.Exploration.create({
      domainId,
      organizationId: 1001
    })
    */
  }
}

export function createExplorationSuccess(domain_data) {
  console.log(domain_data)
  return {
    type: EXPLORATION_CREATE_FULFILLED,
    payload: domain_data
  };
 }

export function createExplorationError(error) {
  return {
    type: EXPLORATION_CREATE_REJECTED,
    payload: error
  };
 }

export function startExploration(domainId) {
  return (dispatch) => {
    dispatch(createExploration(domainId))

    /*
    return dispatch(createExploration(domainId))
    */

    return agent.Exploration.create({
      domainId,
      organizationId: 1001
    }).then( response => {
        
        console.log("start exploration, promiseThen", response);
        console.log(response)
        
        /*const user_code = 'abc123'
        result = {
          payload: {
            data: {
              user_code,
              domain_id: '123',
              created_date: new Date()
            }
          }
        }
        */
        // TODO: We need to parse the success / error calls in a more general / better way
        
        // Note: Error's "data" is in result.payload.response.data (inside "response")
        // success's "data" is in result.payload.data
        if (response.statusCode !== 200) {
          // TODO: Should we unpack error here??
          return dispatch(createExplorationError(response.body));
        } else {
          return dispatch(createExplorationSuccess({ data: response.body.data.createUserExploration }))
        }
      })
      .catch((err) => Promise.reject(err))
  }
}
