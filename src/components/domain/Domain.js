import React, { Component } from 'react'
import { domainComponentType } from '../../types'


const DomainComponent = ({ domainComponent }) => {
  return (
  <div className="domain-info-container">
    <div>
      <label>User Access Code:</label><span>{ domainComponent.accessCode }</span>
    </div>
    <div>
      <label>Domain ID:</label><span>{ domainComponent.domainId }</span>
    </div>
    
    { /* TODO: How to have a moment formatter here? */ }
    <div>
      <label>Created Date:</label><span>{ domainComponent.createdDate.toLocaleDateString({
        year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
      }) }</span>
    </div>

    {domainComponent.acceptedTerms ? (
      <div>
        <label>Terms Accepted:</label><span>Yes</span>
      </div>
      ) : null}
  </div>)
}

DomainComponent.propTypes = {
  domainComponent: domainComponentType.isRequired
}

export default DomainComponent