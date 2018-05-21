import React, { Component } from 'react'

const ExplorationGeneralComponent = ({ data: { loading, error, userExploration }}) => (
  <div>
    {loading || error ? null :
    ( <div className="domain-info-container">
      <div>
        <label>User Access Code:</label><span>{userExploration.accessCode}</span>
      </div>
      <div>
        <label>Domain ID:</label><span>{userExploration.domainId}</span>
      </div>
      
      <div>
        <label>Created Date:</label><span>{ new Date(userExploration.createdDate).toLocaleDateString({
          year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
        }) }</span>
      </div>
      {userExploration.modifiedDate && userExploration.modifiedDate !== userExploration.createdDate ? (
        <div>
          <label>Modified Date:</label><span>{ new Date(userExploration.modifiedDate).toLocaleDateString({
            year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
          }) }</span>
        </div>
      ) : null}

      {userExploration.acceptedTerms ? (
        <div>
          <label>Terms Accepted:</label><span>Yes</span>
        </div>
        ) : null}
    </div>
    )
  }
  </div>
)

export default ExplorationGeneralComponent