import React, { Component } from 'react'

import gql from "graphql-tag"
import { Mutation, graphql, withApollo } from "react-apollo"

import ExplorationGeneralComponent from './ExplorationGeneral'
import ExplorationTermsForm from '../../forms/ExplorationTerms'

import { FETCH_USER_EXPLORATION, UPDATE_USER_EXPLORATION } from '../../queries'

class ExplorationInitialComponent extends Component {
  // TODO: Extract this logic into app root, or maybe as HOC ability to be applied on each page?
  componentWillMount() {
    // Save any id in the url
    if (this.props.match.params.id) {
      // TODO: Should we check and not write if there already is one here?
      const currentExplorationId = this.props.match.params.id
      this.props.client.writeQuery({ query: gql`query { currentExplorationId }`, data: { currentExplorationId } })
    }
    // TODO: Also here we can
  };
  onUpdateComplete() {
    // TODO: Is it ok to grab this from URL each time??
    
    // TODO: How do we get which progress item to go to??
    // Hard code id=1 for now
    this.props.history.push(`/exploration/${this.props.match.params.id}/progress/1`)
  };

  render() {
    console.log(this.props)
    const { loading, error } = this.props.data
    
    if (loading) {
      return <div>Loading...</div>
    }
    if (error) {
      return <div>Error: {error}</div>
    }
    return (
      <div className="Instructions">
        <ExplorationGeneralComponent {...this.props} />
        { true ? (
          <Mutation
            mutation={UPDATE_USER_EXPLORATION}
            onError={/* TODO: For now, just proceed even on error*/ this.onUpdateComplete.bind(this)}
            onCompleted={this.onUpdateComplete.bind(this)}
            update={(store, { data: { updateUserExploration } }) => {
              console.log(store, updateUserExploration)
              const currentExplorationId = updateUserExploration.userExplorationId
              
              // TODO: Do we even need this if we can grab it from URL params every time???
              store.writeQuery({ query: gql`query { currentExplorationId }`, data: { currentExplorationId } })
      
              // Cache the exploration we just updated.  Need to do a read first to prime the cache object to write 
              const data = store.readQuery({ query: FETCH_USER_EXPLORATION, variables: { explorationId: currentExplorationId } })
              Object.assign(data.userExploration, updateUserExploration)
              store.writeQuery({ query: FETCH_USER_EXPLORATION, data })
            }}
          >
          {(updateUserExploration, { data, loading, error, called }) => {
            console.log(data, loading, error, called, updateUserExploration)
            const formSubmitSuccess = (result, dispatch, props) => {
              console.log("ON SUBMIT SUCCESS?", result, dispatch, props, this)
              console.log(updateUserExploration, data, loading, error, called)
              updateUserExploration({ variables: {
                explorationId: this.props.data.userExploration.userExplorationId,
                acceptedTerms: result.acceptedTerms
              } })
            }

            return (
              <ExplorationTermsForm {...{}/* TODO: Hook in initialValues initialValues={{ acceptedTerms: [] }}*/} onSubmitSuccess={formSubmitSuccess.bind(this)} />
            )
          }}
          </Mutation>
        )
        : null}
      </div>
    )
  }
}
/*
ExplorationInitial.propTypes = {
  domainComponent: domainComponentType.isRequired
}
*/


// TODO: Make a "with exploration data" component?
// TODO: Make an "exploration page" component?

export default withApollo(
  graphql(FETCH_USER_EXPLORATION, {
    options: (props) => ({
      variables: {
        explorationId: props.match.params.id
      }
    })
  })(ExplorationInitialComponent))