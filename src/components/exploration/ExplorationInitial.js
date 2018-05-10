import React, { Component } from 'react'

import gql from "graphql-tag"
import { Mutation, withApollo } from "react-apollo"

import ExplorationGeneralComponent from './ExplorationGeneral'
import ExplorationTouComponent from './ExplorationTou'

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
  render() {
    return (
      <div>
        <ExplorationGeneralComponent {...this.props}></ExplorationGeneralComponent>
        { true ? <ExplorationTouComponent {...this.props}></ExplorationTouComponent> : null}
      </div>
    )
  }
}
/*
ExplorationInitial.propTypes = {
  domainComponent: domainComponentType.isRequired
}
*/
export default withApollo(ExplorationInitialComponent)