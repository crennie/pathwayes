import React from 'react'
import { connect } from 'react-redux'

import DomainComponent from '../domain/Domain'
import ExplorationTermsForm from '../../forms/ExplorationTerms'
import { domainComponentType } from '../../types';

import gql from "graphql-tag"
import { Mutation } from "react-apollo"

const mapStateToProps = state => ({
  domainComponent: { ...state.exploration },
  userExplorationId: state.exploration.userExplorationId
});

const mapDispatchToProps = dispatch => ({
  updateComplete(result) {
    console.log("DISPATCH UPDATE COMPLETE!", result, result.updateUserExploration)
  }
})

// TODO: Think of some way of wrapping any form call in the Mutation object, if it impacts exploration data
const ExplorationInitial = ({ updateComplete, userExplorationId, domainComponent }) => (
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
          <DomainComponent domainComponent={domainComponent}></DomainComponent>
          <ExplorationTermsForm onSubmitSuccess={formSubmitSuccess}></ExplorationTermsForm>
        </div>
      )
    }}
  </Mutation>
)
ExplorationInitial.propTypes = {
  domainComponent: domainComponentType.isRequired
}
export default connect(mapStateToProps, mapDispatchToProps)(ExplorationInitial)