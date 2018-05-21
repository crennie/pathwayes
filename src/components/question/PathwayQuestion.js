import React, { Component } from 'react'
import PathwayAnswerForm from '../../forms/PathwayAnswer'
import { withApollo, graphql } from 'react-apollo';

import { FETCH_USER_PATHWAYS } from '../../queries'

class PathwayQuestionComponent extends Component {
  state = {
    selectedPathsCount: 0 // TODO: Prime this value ?
  };

  formSubmitSuccess(result, props, dispatch) {
    console.log("FORM SUBMIT SUCCESS!")
    
    const client = this.props.client
    let userPathwaysToAdd = [],
      userPathwaysToRemove = [],
      nextNodeId,
      existingUserPathways = this.props.data.userPathways || []
    

    // TODO NOTE Can remove some logic out when no longer need for alert, and just get changeset of existingUserPathways
    this.props.answers.forEach((answer, index) => {
      if (!nextNodeId && !answer.pathwayToCreate) {
        // TODO: Also add the type or something here?
        nextNodeId = answer.nextNodeId
      }
      console.log(answer, index);
      if (result.pathwayAnswers.includes(String(index))) {
        if (!existingUserPathways.filter((p) => p.id === answer.pathwayToCreate).length) {
          // TODO NOTE Add the index in for testing
          userPathwaysToAdd.push(Object.assign({ index }, answer))
        }
      } else if (existingUserPathways.filter((p) => p.id === answer.pathwayToCreate).length) {
        userPathwaysToRemove.push(answer)
      }
    })
    
    //alert(`Pathway IDs to add: ${userPathwaysToAdd.map((a) => a.pathwayToCreate).join(', ')}` + '\n\n' + 
    //  `Pathway IDs to remove: ${userPathwaysToRemove.map((a) => a.pathwayToCreate).join(', ')}`)

    
    const pathwaysToKeep = existingUserPathways.filter((p) =>
      !(userPathwaysToRemove.filter((a) => a.pathwayToCreate === p.id).length)
    )
    const myNewPathways = userPathwaysToAdd.map((a) => ({
      id: a.pathwayToCreate,
      pathwayTitle: `Pathway selected: option #${a.index+1}`,
      nextNodeId: 2,
      description: `Selected: "${a.title}"`,
      __typename: 'FakeUserPathway'
    }))


    console.log(pathwaysToKeep, myNewPathways)
    
    // Fake a create UserPathway
    // Add the new pathways => 
    client.writeQuery({
      query: FETCH_USER_PATHWAYS,
      data: {
        userPathways: [...pathwaysToKeep, ...myNewPathways]
      }
    })

    if (!nextNodeId) {
      // TODO: No next nodeId? Cycle pathway?? Should this be done in a global way??
      var response = client.readQuery({ query: FETCH_USER_PATHWAYS })
      response.userPathways.forEach((p) => {
        if (nextNodeId) return;
        nextNodeId = p.nextNodeId
      })

      console.log('pathwayquestion: ', response)

      
      // If still no next node, what to do?
      if (!nextNodeId) {
        console.log("[Error] Still no Next node to navigate to!  end?")
      }
    }
    this.props.history.push(`/exploration/${this.props.match.params.id}/progress/${nextNodeId}`)
  };

  formChange(values) {
    const selectedPathsCount = values && values.pathwayAnswers ? values.pathwayAnswers.length : 0
    this.setState({ selectedPathsCount })
  };

  render() {
    const { client, questionID, answers } = this.props
    return (
      <div className="Question select_paths">
        <h2><span>Select paths to explore</span></h2>
        <p className="question_text">Please select the items from the list below that you would like to answer questions about</p>
        <p className="paths_count"><span>{this.state.selectedPathsCount}</span> new pathways added</p>
        <PathwayAnswerForm  questionID={questionID} answers={answers}
            onSubmitSuccess={this.formSubmitSuccess.bind(this)} onChange={this.formChange.bind(this)}/>
      </div>
    )
  }
}

export default withApollo(
  graphql(FETCH_USER_PATHWAYS, {
    options: (props) => ({
      variables: {
        explorationId: props.match.params.id
      }
    })
  })(PathwayQuestionComponent))