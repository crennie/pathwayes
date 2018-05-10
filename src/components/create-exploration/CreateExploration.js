import React from 'react'
import { createExplorationType } from '../../types'

import AutorunMutation from '../mutation/AutorunMutation'
import { connect } from 'react-redux'

import gql from "graphql-tag"
import { Mutation } from "react-apollo"

const CreateExploration = ({ domainId, organizationId, explorationCreateComplete }) => (
  <Mutation
      mutation={gql`
          mutation {
            createUserExploration(userExploration: {
              domainId: ${domainId},
              organizationId: ${organizationId},
              explorationCompletionDate: "2018-12-12"
            }) {
              userExplorationId
              domainId
              acceptedTerms
              accessCode
              modifiedDate
            }
          }`}

      onCompleted={explorationCreateComplete}
    >
    {(createUserExploration, { data, loading, error, called }) => {
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
)
CreateExploration.propTypes = { ...createExplorationType.isRequired }

export default CreateExploration