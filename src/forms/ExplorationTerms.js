import React from 'react'

import Checkbox from '../components/checkbox/Checkbox'
import { Field, reduxForm, SubmissionError } from 'redux-form'

import {
  EXPLORATION_PAGE_TERMS_SELECTION
} from './actionTypes'

const ExplorationTermsForm = (props) => {
  //const { error, handleSubmit, clearSubmitErrors } = props
  return (
    <form className="user-terms-container" no-validate="true">
      <Checkbox
          name="acceptedTerms"
          options={[ { label: "I accept the terms and conditions", value: 'accepted' }]}
        />
    </form>
  )
}

const ReduxedExplorationTermsForm = reduxForm({
  form: EXPLORATION_PAGE_TERMS_SELECTION,
  onSubmit: (values) => {
    if (!values.acceptedTerms || !values.acceptedTerms.length || values.acceptedTerms[0] !== 'accepted') {
      throw new SubmissionError({ acceptedTerms: 'Select to continue' })
    }
    return { acceptedTerms: values.acceptedTerms[0] === 'accepted' }
  },
  /*
  TODO: Pass this in as prop
  onSubmitSuccess: (result, dispatch, props) => {
    console.log("ON SUBMIT SUCCESS?", result, dispatch, this)
    dispatch(submitApiData(props.userExplorationId, result))
  }
  */
})(ExplorationTermsForm)

// TODO: Use proptypes and make "initialValues", and "onSubmitSuccess" required

export default ReduxedExplorationTermsForm