import React, { Component } from 'react'

import ExplorationTermsForm from '../../forms/ExplorationTerms'
import { domainComponentType, } from '../../types';

import gql from "graphql-tag"
import { Query, withApollo } from "react-apollo"

import { FETCH_USER_EXPLORATION } from '../../queries'

class ExplorationGeneralComponent extends Component {
  internalState = {
    currentExplorationId: null
  };
  componentWillMount() {
    const { currentExplorationId } = this.props.client.readQuery({ query: gql`query { currentExplorationId }` })
    this.internalState.currentExplorationId = currentExplorationId
  }
  render() {
    const explorationId = this.internalState.currentExplorationId
    return (
      <Query
          query={FETCH_USER_EXPLORATION}
          variables={{ explorationId }}
        >
        {({ loading, error, data }) => {
          console.log(loading, error, data);
          if (loading) return "Loading..."
          if (error) return `Error! ${error.message}`

          const { userExploration } = data
          if (!userExploration) {
            return
          }

          // TODO: Where would we do Date parsing, for instance?
          return (
            <div className="domain-info-container">
              <div>
                <label>User Access Code:</label><span>{userExploration.accessCode}</span>
              </div>
              <div>
                <label>Domain ID:</label><span>{userExploration.domainId}</span>
              </div>
              
              <div>
                <label>Created Date:</label><span>{ new Date(userExploration.createdDate).toLocaleDateString({
                  year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
                }) }</span>
              </div>

              {/* TODO: Maybe have acceptedTerms in another component?? */}
              {data.acceptedTerms ? (
                <div>
                  <label>Terms Accepted:</label><span>Yes</span>
                </div>
                ) : null}
            </div>
          )
        }}
      </Query>
    )
  }
}

export default withApollo(ExplorationGeneralComponent)