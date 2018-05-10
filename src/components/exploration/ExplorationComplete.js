import React from 'react'
import { connect } from 'react-redux'

import DomainComponent from '../domain/Domain'
import { domainComponentType } from '../../types';

const mapStateToProps = state => ({
  domainComponent: { ...state.exploration }
});
const ExplorationComplete = ({ domainComponent }) => (
  <div>
    <DomainComponent domainComponent={domainComponent}></DomainComponent>
    <div>Exploration Completed</div>
  </div>
)
ExplorationComplete.propTypes = {
  domainComponent: domainComponentType.isRequired
}

export default connect(mapStateToProps, null)(ExplorationComplete)