import React, { Component } from 'react'

class Question extends Component {
  state = {
    answer_selections: new Map()
  };

  next_toggle(answer_selections) {
    // TODO: This isn't the React way - state should be top level instead of having side effect funcs like this!
    if (answer_selections.size) {
      document.getElementById('next_btn').classList.add('enable');
    } else {
      document.getElementById('next_btn').classList.remove('enable');
    }
  };

  handleRadioClick(e, answer) {
    e.preventDefault()
    let answer_selections = new Map()
    answer_selections.set(answer.id, answer)
    this.next_toggle(answer_selections)
    this.setState({ answer_selections })
  };

  handleCheckboxClick(e, answer) {
    e.preventDefault()
    let answer_selections = new Map(this.state.answer_selections)
    if (this.state.answer_selections.has(answer.id)) {
      answer_selections.delete(answer.id)
    } else {
      answer_selections.set(answer.id, answer)
    }
    this.next_toggle(answer_selections)
    this.setState({ answer_selections })
  };

  questionAnswers(type) {
    // type supports 'single' or 'multiple'
    return (
      <ul className="Question-answers">
        {this.props.question.answers.map(answer => (
          <li key={answer.id} className={this.state.answer_selections.has(answer.id) ? 'selected' : '' }>
            <button className={type === 'single' ? 'radio' : 'checkbox'}
              onClick={(e) => type === 'single' ? this.handleRadioClick(e, answer) : this.handleCheckboxClick(e, answer) } />
            {answer.answer}
            {answer.extra_text ? <p className="extra_text">{answer.extra_text}</p> : []}
          </li>
        ))}
      </ul>
    )
  };
  
  singleQuestionAnswers() {
    return this.questionAnswers('single')
  };

  multiQuestionAnswers() {
    return this.questionAnswers('multiple')
    /*<div className="item select_paths">
        <h2><span>Select paths to explore</span></h2>
        <p className="question_text">Please select the items from the list below that you would like to answer questions about</p>
        <p className="paths_count"><span>0</span> new pathways added</p>
        <ul></ul>
      </div>
      */
  };

  
  render() {
    const answer_jsx = this.props.question.type === 'multiple' ? this.multiQuestionAnswers() : this.singleQuestionAnswers()
    return (
      <div className="Question item template_item">
        <p className="question_text">{this.props.question.question}</p>
        <p className="question_extra_text">{this.props.question.extra_text}</p>
        {answer_jsx}
      </div>
    )
  }

}
export default Question