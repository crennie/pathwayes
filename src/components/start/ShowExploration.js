import React, { Component } from 'react'
//import { createExplorationType } from '../../types'

//import AutorunMutation from '../mutation/AutorunMutation'

import gql from "graphql-tag"
import { graphql } from 'react-apollo'

const createExplorationMutation = gql`
mutation createExploration($domainId: Int!, $date: String!) {
  createUserExploration(userExploration: {
    domainId: $domainId,
    explorationCompletionDate: $date
  }) {
    userExplorationId
    domainId
    acceptedTerms
    accessCode
    modifiedDate
  }
}`

class ShowExploration extends Component {
  //({ domainId, organizationId, explorationCreateComplete }) => (
  state = {
    domainId: this.props.domainId,
    accessCode: this.props.accessCode
  }
  componentDidMount() {
    console.log(this.props)
    if (this.props.accessCode) {
      // We already have an access code saved! Just exit in this case??
      console.log("Access code already present, just exit for now")
      return;
    }

    // TODO: Here is where we perform the action
    this.props.mutate({
      variables: { domainId: this.props.domainId, date: '2019-01-01' }
    }).then( result => {
      console.log("mutate finished", result)
    })
  };

  render() {
    console.log(this.props)
    return (
      <div>
        test
      </div>
    )
  }
  /*  {(createUserExploration, { data, loading, error, called }) => {
      console.log(data, loading, error, called, createUserExploration)

      return (
        <div>
          <p>Called: {called ? 'True' : 'False'}</p>
          {!error && <p>Loading...</p>}
          {error && <p>Error</p>}
          {error ? error : null}
          <AutorunMutation
              mutateFn={createUserExploration}
              shouldRun={!called}
            >
          </AutorunMutation>
        </div>
      )
    }
  }
  </Mutation>
  */

}
//ShowExploration.propTypes = { ...createExplorationType.isRequired }


const ShowExplorationWithMutation = graphql(createExplorationMutation)(ShowExploration)

export default ShowExplorationWithMutation