import React, { Component } from 'react'
import Question from '../question/Question'

// Represents the main content column
class MainContent extends Component {

  getSelectedAnswers() {
    const question = this.refs.question;
    if (question) {
      console.log(question.state)

      return question.state.answer_selections;
    } else {
      return new Map()
    }
  };

  questionContent() {
    return (
      <Question ref="question" question={this.props.currentNode}></Question>
    )
  };

  render() {
    const content_jsx = this.props.currentNode.type && this.props.currentNode.type ? this.questionContent() : []
    return (
      <div id="contents">							
        <div className="content">
          <div className="content_abs">
            {content_jsx}
          </div>
        </div>
      </div>
    )
  }
}

export default MainContent