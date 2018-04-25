import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Link } from 'react-router-dom'

import {
  REDIRECT
} from '../actions/actionTypes'

const DEFAULT_DOMAIN_ID = 'TEST'
export function withValidExplorationCheck(WrappedComponent) {
  const mapStateToProps = state => {
    return {
      user_code: state.domain.user_code,
      domain_id: state.domain.domain_id || DEFAULT_DOMAIN_ID
    }
  };
  class ComponentWithValidExplorationCheck extends Component {
    _isInvalidRoute() {
      return !this.props.match.params.id || this.props.user_code !== this.props.match.params.id
    };
    render() {
      console.log(this)
      if (this._isInvalidRoute()) {
        return (
          <div>
            <p>Invalid or expired URL.</p>
            <p><Link to={`/start?type=new&domain=${this.props.domain_id}`}>Start a new exploration in domain "{this.props.domain_id}" here</Link></p>
          </div>
        )
      } else {
        return <WrappedComponent {...this.props}></WrappedComponent>
      }
    }
  }
  return connect(mapStateToProps, null)(ComponentWithValidExplorationCheck)
}

export function withPageLoad(WrappedComponent, { page_load_action }) {
  const mapDispatchToProps = dispatch => {
    console.log('got new props to watch??')
    return {
      onPageLoad: () => {
        console.log('dispatching...', page_load_action)
        console.log('to: ', WrappedComponent)
        dispatch({type: page_load_action})
      }
    }
  };
  class ComponentWithPageLoad extends Component {
    componentDidMount() {
      this.props.onPageLoad()
    };
    render() {
      return <WrappedComponent {...this.props}></WrappedComponent>;
    }
  }
  return connect(null, mapDispatchToProps)(ComponentWithPageLoad)
}

export function withRedirects(WrappedComponent) {
  const mapStateToProps = state => {
    return {
      redirectTo: state.common.redirectTo
    }
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      onRedirect: () => dispatch({type: REDIRECT})
    }
  };
  class ComponentWithRedirects extends Component {
    componentWillReceiveProps = (nextProps) => {
      const redirect_url = nextProps.redirectTo
      if (redirect_url) {
        this.props.history.push(redirect_url)
        this.props.onRedirect();
      }
    };

    render() {
      return <WrappedComponent {...this.props}></WrappedComponent>;
    }

  }

  return connect(mapStateToProps, mapDispatchToProps)(ComponentWithRedirects)
}

export function asPage(WrappedComponent, extraData) {
  // TODO: For now, we can just pass extraData to each wrapper.  Any extras will just be in props and be ignored and that's ok

  // The order of wrapping matters -
  // - we should do the redirect check first
  
  return withPageLoad(withRedirects(withValidExplorationCheck(WrappedComponent, extraData), extraData), extraData)
}