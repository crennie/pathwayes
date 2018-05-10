import React, { Component } from 'react'

import ShowExploration from './ShowExploration'

import gql from "graphql-tag"
import { graphql, compose } from 'react-apollo'

const createExplorationMutation = gql`
  mutation ($domainId: Int!, $date: String!) {
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

const accessCodeLoginMutation = gql`
  mutation ($accessCode: String),
    accessCodeLogin(accessCode: $accessCode)
  }`

class StartComponent extends Component {
  state = {
    is_valid_url: null
  };

  _getUrlDomainId() {
    const params = new URLSearchParams(this.props.location.search)
    return parseInt(params.get('domain'))
  };

  isUrlValid() {
    const params = new URLSearchParams(this.props.location.search)
    return this._getUrlDomainId() && params.get('type') === 'new';
  };

  componentDidMount() {
    console.log("did mount", this);
    if (this.state.is_valid_url === false || !this.isUrlValid()) {
      return; 
    } else if (this.state.is_valid_url !== true) {
      this.state.is_valid_url = true;
    }

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

    // TODO: Any routing or anything that needs to be done??
    if (this.explorationShouldBeCreated()) {
      const domainId = this._getUrlDomainId()
      //this.props.startExploration(domainId)
    }
  };

  render() {
    console.log("In start", this)
    let pageRender
    if (this.internalState.is_valid_url === false) {
      pageRender = <div>Invalid URL</div>
    } else if (!this.props.accessCode) {
      const domainId = this._getUrlDomainId()
      pageRender = (
        <ShowExploration domainId={domainId}></ShowExploration>)
    } else {
      pageRender = <div>All loads complete - starting exploration</div>
    }
    return pageRender
  }
}

export default compose(
  graphql(createExplorationMutation, { name: 'createExploration' }),
  graphql(accessCodeLoginMutation, { name: 'login' })
)(StartComponent)