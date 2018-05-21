import React from 'react'

import Checkbox from '../components/checkbox/Checkbox'
import { Field, reduxForm, SubmissionError } from 'redux-form'

import {
  EXPLORATION_PAGE_PATHWAY_QUESTION
} from './actionTypes'


const PathwayAnswerSelectForm = (props) => {
  const { answers } = props
  // Pass in an optional onChange
  const onChange = props.onChange ? { onChange: props.onChange } : {}
  //const { error, handleSubmit, clearSubmitErrors } = props
  return (
    <form className="Answers" no-validate="true">
      <Checkbox
          name="pathwayAnswers"
          options={answers.map((answer, index) => 
            ({ label: answer.title, sub_label: answer.displayText, value: String(index) })
          )}
          {...onChange}
        />
    </form>
  )
}

const ReduxedPathwayAnswerSelectForm = reduxForm({
  form: EXPLORATION_PAGE_PATHWAY_QUESTION,
  onSubmit: (values) => {
    console.log("onSubmit ", values)
    if (!values || Object.keys(values).filter((key) => Array.isArray(values[key]) ? values[key].length : values[key]).length === 0) {
      throw new SubmissionError({ pathwayAnswers: "Select at least one pathway to continue" })
    }
    return values
  },
  /*
  TODO: Pass this in as prop
  onSubmitSuccess: (result, dispatch, props) => {
    console.log("ON SUBMIT SUCCESS?", result, dispatch, this)
    dispatch(submitApiData(props.userExplorationId, result))
  }
  */
})(PathwayAnswerSelectForm)

// TODO: Use proptypes and make "initialValues", and "onSubmitSuccess" required

export default ReduxedPathwayAnswerSelectForm