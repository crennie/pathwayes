import React from 'react'
import { connect } from 'react-redux'

import DomainComponent from '../domain/Domain'
import ExplorationTermsForm from '../../forms/ExplorationTerms'

const mapStateToProps = (state, ownProps) => {
  return {
    termsAccepted: state.exploration.terms_accepted,
    domainData: state.domain
  }
};

const ExplorationInitial = ({ termsAccepted, domainData }) => (
  <div>
    <DomainComponent termsAccepted={termsAccepted} domainData={{...domainData}}></DomainComponent>
    <ExplorationTermsForm></ExplorationTermsForm>
  </div>
)

export default connect(mapStateToProps, null)(ExplorationInitial)