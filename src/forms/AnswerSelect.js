import React, { Component } from 'react'
import Radio from '../components/radio/Radio'
import { reduxForm, SubmissionError } from 'redux-form'

import {
  EXPLORATION_PAGE_QUESTION_SELECTION
} from './actionTypes'

const AnswerSelectForm = ({ answers }) => {
  //const { error, handleSubmit, clearSubmitErrors } = props
  return (
    <form className="Answers" no-validate="true">
      <Radio
          group="answerGroup"
          name="answer"
          options={answers.map((answer, index) =>
            ({ label: answer.title, sub_label: answer.displayText, value: String(index) })
          )}
        />
    </form>
  )
}
// TODO: Add some propTypes for requiredness

const ReduxedAnswerSelectFormForm = reduxForm({
  form: EXPLORATION_PAGE_QUESTION_SELECTION,
  onSubmit: (values) => {
    if (!values || Object.keys(values).length === 0) {
      throw new SubmissionError({ answer: 'Select an answer' })
    }
    console.log(values);
    return values
  },
  /*
  TODO: Pass this in as prop
  onSubmitSuccess: (result, dispatch, props) => {
    console.log("ON SUBMIT SUCCESS?", result, dispatch, this)
    dispatch(submitApiData(props.userExplorationId, result))
  }
  */
})(AnswerSelectForm)

// TODO: Use proptypes and make "initialValues", and "onSubmitSuccess" required

export default ReduxedAnswerSelectFormForm