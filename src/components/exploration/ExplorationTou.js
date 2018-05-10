import React from 'react'

import ExplorationTermsForm from '../../forms/ExplorationTerms'

import gql from "graphql-tag"
import { Mutation } from "react-apollo"

const ExplorationTouComponent = ({ updateComplete, userExplorationId, domainComponent }) => (
  <Mutation
      mutation={gql`
          mutation ($acceptedTerms: Bool) {
            updateUserExploration(userExploration: {
              userExplorationId: ${userExplorationId}
              acceptedTerms: $acceptedTerms,
            }) {
              userExplorationId
              domainId
              acceptedTerms
              accessCode
              modifiedDate
            }
          }`}
      onCompleted={updateComplete}
    >
    {(updateUserExploration, { data, loading, error, called }) => {
      console.log(data, loading, error, called, updateUserExploration)
      // TODO: Are there any checks here about 

      const formSubmitSuccess = (result, dispatch, props) => {
        console.log("ON SUBMIT SUCCESS?", result, dispatch, this)
        updateUserExploration({ variables: { acceptedTerms: props.acceptedTerms }})
      }

      return (
        <div>
          
        </div>
      )
    }}
  </Mutation>
)

export default ExplorationTouComponent