import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Route, Link } from 'react-router-dom'
import ExplorationInitial from '../../pages/ExplorationInitial'
import ExplorationComplete from '../../pages/ExplorationComplete'

import {
  EXPLORATION_PAGE_TERMS_SELECTION,
  EXPLORATION_PAGE_TERMS_COMPLETE,
  REDIRECT
} from '../actions/actionTypes'

const DEFAULT_DOMAIN_ID = 'TEST'

const mapStateToProps = (globalState, ownProps) => {
  return {
    redirectTo: globalState.common.redirectTo,
    termsAccepted: globalState.exploration.terms_accepted,
    domainData: globalState.domain,
    user_code: globalState.domain.user_code,
    domain_id: globalState.domain.domain_id || DEFAULT_DOMAIN_ID
  }};

const mapDispatchToProps = dispatch => ({
  onLoadTerms: () => dispatch({ type: EXPLORATION_PAGE_TERMS_SELECTION }),
  onLoadEnd: () => dispatch({ type: EXPLORATION_PAGE_TERMS_COMPLETE }),
  onRedirect: () => dispatch({ type: REDIRECT })
});

class ExplorationContainer extends Component {
  
  componentWillReceiveProps(nextProps) {
    const redirect_url = nextProps.redirectTo
    if (redirect_url) {
      if (redirect_url.includes('/end')) {
        this.props.onLoadEnd()
      }
      this.props.history.push(redirect_url)
      this.props.onRedirect();
    }
  };

  componentDidMount() {
    if (!this._isInvalidRoute()) {
      if (this.props.match.url.includes('/terms')) {
        this.props.onLoadTerms()
      } else if (this.props.match.url.includes('/end')) {
        this.props.onLoadEnd()
      }
    }
  };

  _isInvalidRoute() {
    return !this.props.match.params.id || this.props.user_code !== this.props.match.params.id
  };

  _invalidRender() {
    return (
      <div>
        <p>Invalid or expired URL.</p>
        <p><Link to={`/start?type=new&domain=${this.props.domain_id}`}>Start a new exploration in domain "{this.props.domain_id}" here</Link></p>
      </div>
    )
  };

  render() {
    if (this._isInvalidRoute()) {
      return this._invalidRender();
    }
		return (
      <div>
        <Route exact path="/exploration/:id/terms" render={() => (
          <div>
            <DomainComponent termsAccepted={this.props.termsAccepted} domainData={{...this.props.domainData}}></DomainComponent>
            <ExplorationTermsForm></ExplorationTermsForm>
          </div>
        )} />
        <Route exact path="/exploration/:id/end" render={() =>(
          <DomainComponent termsAccepted={this.props.termsAccepted} domainData={{...this.props.domainData}}></DomainComponent>
        )} />
        <Route exact strict path="/exploration/:id/" render={() => {
          {this._invalidRender()}
        }} />
    </div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ExplorationContainer)