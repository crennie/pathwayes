import React from 'react'
import { connect } from 'react-redux'

import DomainComponent from '../domain/Domain'

const mapStateToProps = (state, ownProps) => {
  return {
    termsAccepted: state.exploration.terms_accepted,
    domainData: state.domain
  }
};
const ExplorationComplete = ({ termsAccepted, domainData }) => {
  console.log(this, termsAccepted, domainData)
  return <DomainComponent termsAccepted={termsAccepted} domainData={{...domainData}}></DomainComponent>
}


export default connect(mapStateToProps, null)(ExplorationComplete)