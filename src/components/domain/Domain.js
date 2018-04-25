import React, { Component } from 'react'

class DomainComponent extends Component {
  render() {
    return (
      <div className="domain-info-container">
        <div>
          <label>User Access Code:</label><span>{ this.props.domainData.user_code }</span>
        </div>
        <div>
          <label>Domain ID:</label><span>{ this.props.domainData.domain_id }</span>
        </div>
        
        { /* TODO: How to have a moment formatter here? */ }
        <div>
          <label>Created Date:</label><span>{ this.props.domainData.created_date.toLocaleDateString({
            year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
          }) }</span>
        </div>

        {this.props.termsAccepted ? (
          <div>
            <label>Terms Accepted:</label><span>Yes</span>
          </div>
         ) : null}
      </div>
    )
  }
}

export default DomainComponent