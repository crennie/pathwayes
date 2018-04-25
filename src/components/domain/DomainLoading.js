import React from 'react'

import '../../static/bootstrap/css/bootstrap.css'

export default ({domainId, loadComplete}) => {
  if (!loadComplete) {
    return (
      <div className="domain-loading-component domain-loading">
        <div className="domain-loading-icon-component">
          <div className="traffic-icon traffic-stop-anim"></div>
        </div>
        <div className="">
          <span><b className="glyphicon glyphicon-info-sign"></b>Preparing exploration for domain { domainId }</span>
        </div>
      </div>
    )
  }
  
  return (
    <div className="domain-loading-component domain-loading-complete">
      <div className="domain-loading-icon-component">
        <div className="traffic-icon traffic-go-anim"></div>
      </div>
      <div className="">
        <div>
          <span><b className="glyphicon glyphicon-ok"></b>Preparing exploration for domain { domainId }</span>
        </div>
        <div>
          <span><b className="glyphicon glyphicon-ok"></b>Exploration ready! Now starting...</span>
        </div>
      </div>
    </div>
  )
}