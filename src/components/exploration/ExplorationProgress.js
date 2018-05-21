import React, { Component } from 'react'

import gql from "graphql-tag"
import { graphql, compose, withApollo } from "react-apollo"

import { FETCH_SYSTEM_DATA_AND_USER_STEPS, FETCH_SYSTEM_DATA, FETCH_USER_EXPLORATION, FETCH_USER_STEPS } from '../../queries'

import PathwayQuestion from '../question/PathwayQuestion'
import Question from '../question/Question'

import Ending from '../ending/Ending'

import {
  EXPLORATION_PAGE_QUESTION_SELECTION,
  EXPLORATION_PAGE_PATHWAY_QUESTION
} from '../../forms/actionTypes'

class ExplorationProgressComponent extends Component {
  
  isSingleQuestion() {
    const { systemData } = this.props.data,
      { questionType } = systemData ? systemData : {}
    return questionType === 2
  };
  isPathwayQuestion() {
    const { systemData } = this.props.data,
      { questionType } = systemData ? systemData : {}
    return questionType === 1
  };

  // TODO: Extract this logic into app root, or maybe as HOC ability to be applied on each page?
  componentWillMount() {
    // Save any id in the url
    if (this.props.match.params.id) {
      // TODO: Should we check and not write if there already is one here?
      const currentExplorationId = this.props.match.params.id
      this.props.client.writeQuery({ query: gql`query { currentExplorationId }`, data: { currentExplorationId } })
    }
  };

  componentDidMount() {
    console.log(this.props)
    // TODO: Prime question form based on question/page type
    if (this.isSingleQuestion()) {
      this.props.primeForm(EXPLORATION_PAGE_QUESTION_SELECTION)
    } else if (this.isPathwayQuestion()) {
      this.props.primeForm(EXPLORATION_PAGE_PATHWAY_QUESTION)
    }
  };

  render() {
    console.log(this.props)
    const { loading, error, systemData, variables: { nodeId },  } = this.props.data,
      { questionType } = systemData ? systemData : {}
    
    if (loading) {
      return <div>Loading...</div>
    }
    if (error) {
      return <div>Error: {JSON.stringify({e: error})}</div>
    }

    if (!systemData || !questionType) {
      return <div>No valid system data object found for id {nodeId}</div>
    }
    return (
      <div id="contents">
        {questionType === 1 ?
          <PathwayQuestion {...systemData} {...this.props} />
        : questionType === 2 ?
          <Question {...systemData} {...this.props} />
        : questionType === 9 ?
          <Ending {...systemData} {...this.props} />
        :
          <div>Unknown question type {questionType}</div>}
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

// TODO: we should do any data loads here that we need (userReports? get next question?)

// TODO: How to compose two queries?
export default withApollo(compose(
  graphql(FETCH_SYSTEM_DATA, {
    options: (props) => ({
      variables: {
        nodeId: parseInt(props.match.params.nodeId)
      }
    })
  }),
  //graphql(FETCH_USER_STEPS)
)(ExplorationProgressComponent))