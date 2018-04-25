import React, { Component } from 'react'
import { connect } from 'react-redux'

import DomainErrorComponent from '../components/domain/DomainError'
import DomainLoadingComponent from '../components/domain/DomainLoading'
import { fetchDomain } from '../actions/domainActions'

import {
  DOMAIN_FETCH_ANIMATE,
  DOMAIN_FETCH_ANIMATE_COMPLETE
} from '../actions/actionTypes'

const mapStateToProps = (globalState, ownProps) => {
  return {
    appLoaded: globalState.common.appLoaded,
    redirectTo: globalState.common.redirectTo,

    domainUserCode: globalState.domain.user_code,
    domainError: globalState.domain.error,
    domainLoading: globalState.domain.loading
  }
};

const mapDispatchToProps = dispatch => ({
  loadDomain: (id) => {
    console.log("fetching domain....")
    dispatch(fetchDomain(id)).then( (result) => {
      console.log('SHOW ANIMATION', result)
      setTimeout( (() => {
        dispatch({type: DOMAIN_FETCH_ANIMATE_COMPLETE, payload: result.payload })
      }).bind(this), 3000)
    })
  }
});


class DomainContainer extends Component {
  internalState = {
    domainId: null
  };

  _getUrlDomainId() {
    const params = new URLSearchParams(this.props.location.search)
    return params.get('domain')
  };

  // TODO: Should we let previous loads overwrite this??
  _domainLoaded() {
    return this.props.domainError || this.props.domainUserCode
  };

  _domainNeedsLoad() {
    const params = new URLSearchParams(this.props.location.search)
    return this._getUrlDomainId() && params.get('type') === 'new' && !this._domainLoaded()
  };
  
  componentWillMount() {
    if (!this.internalState.domainId && this._domainNeedsLoad()) {
      // Add local view state data...
      const domainId = this._getUrlDomainId()
      this.internalState.domainId = domainId
      this.props.loadDomain(domainId)
    }
  };
  
  render() {
    if (!this.props.appLoaded) {
      return null
    }

    let domainRender
    if (this.props.appLoaded && !this.internalState.domainId) {
      domainRender = <div>Invalid start, show or redirect to error page</div>
    } else if (this.props.domainError) {
      domainRender = <DomainErrorComponent errorMsg={this.props.domainError}></DomainErrorComponent>
    } else {
      domainRender = <DomainLoadingComponent domainId={this.internalState.domainId} loadComplete={!this.props.domainLoading}></DomainLoadingComponent>
    }

    return (
      <div className="domain-container">
        {domainRender}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DomainContainer)