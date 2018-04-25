import React from 'react'
import { connect } from 'react-redux'

import Checkbox from '../components/checkbox/Checkbox'
import { Field, reduxForm, SubmissionError } from 'redux-form'

import {
  EXPLORATION_PAGE_TERMS_SELECTION
} from '../actions/actionTypes'

import {
  submitApiData
} from '../actions/formActions'

const ExplorationTermsForm = (props) => {
  const { error, handleSubmit, clearSubmitErrors } = props
  return (
    <form onSubmit={handleSubmit} className="user-terms-container" no-validate="true">
      <Field
          name="terms_accepted"
          label="I accept the terms and conditions"
          component={Checkbox}
          onChange={clearSubmitErrors}
        />
    </form>
  )
}

const ReduxedExplorationTermsForm = reduxForm({
  form: EXPLORATION_PAGE_TERMS_SELECTION,
  onSubmit: (values) => {
    if (!values.terms_accepted) {
      throw new SubmissionError({ terms_accepted: 'Select to continue' })
    }
    return values
  },
  onSubmitSuccess: (result, dispatch) => {
    console.log("ON SUBMIT SUCCESS?", result, dispatch, this)
    dispatch(submitApiData(result))
  }
})(ExplorationTermsForm)

const mapStateToProps = (state) => ({
  initialValues: state.exploration
})

export default connect(mapStateToProps, null)(ReduxedExplorationTermsForm)