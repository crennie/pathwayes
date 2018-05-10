import React, { Component } from 'react'
import { connect } from 'react-redux'

import DomainLoadingComponent from '../components/domain/DomainLoading'

import { beginExploration } from '../actions/explorationActions'
import { login } from '../actions/authActions'

import CreateExplorationComponent from '../components/create-exploration/CreateExploration'
import AccessCodeLoginComponent from '../components/login/AccessCodeLogin'

import {
  EXPLORATION_CREATE_ANIMATE,
  EXPLORATION_CREATE_ANIMATE_COMPLETE,
  
  EXPLORATION_CREATED,
  ACCESS_CODE_AUTHORZED
} from '../actions/actionTypes'

const createExploratonDispatchToProps = dispatch => ({
  explorationCreateComplete(result) {
    console.log("COMPLETE RESULT", result)
    // TODO: Is there a better way to parse data here?
    dispatch({ type: EXPLORATION_CREATED, payload: result.createUserExploration})
  }
})
const ReduxCreateExplorationComponent = connect(null, createExploratonDispatchToProps)(CreateExplorationComponent)



const accessCodeLoginDispatchToProps = dispatch => ({
  loginComplete(result) {
    console.log("AUTHORIZED RESULT", result)
    localStorage.setItem('token', result.accessCodeLogin)
    dispatch({ type: ACCESS_CODE_AUTHORZED, payload: result.accessCodeLogin })
    dispatch(beginExploration())
  }
})

const ReduxAccessCodeLoginComponent = connect(null, accessCodeLoginDispatchToProps)(AccessCodeLoginComponent)


const mapStateToProps = state => ({
  appLoaded: state.common.appLoaded,
  redirectTo: state.common.redirectTo,
  
  isAuth: state.common.token,
  accessCode: state.exploration.accessCode
});

class StartContainer extends Component {
  internalState = {
    is_valid_url: null
  };

  _getUrlDomainId() {
    const params = new URLSearchParams(this.props.location.search)
    return parseInt(params.get('domain'))
  };

  isUrlValid() {
    const params = new URLSearchParams(this.props.location.search)
    return this._getUrlDomainId() && params.get('type') === 'new';
  };

  explorationShouldBeCreated() {
    return !this.props.isLoaded;
  }
  
  componentDidMount() {
    if (this.internalState.is_valid_url === false || !this.isUrlValid()) {
      return; 
    } else if (this.internalState.is_valid_url !== true) {
      this.internalState.is_valid_url = true;
    }

    // TODO: Any routing or anything that needs to be done??
    if (this.explorationShouldBeCreated()) {
      const domainId = this._getUrlDomainId()
      //this.props.startExploration(domainId)
    }
  };

  render() {
    if (!this.props.appLoaded) {
      return null
    }
    let pageRender
    if (this.internalState.is_valid_url === false) {
      pageRender = <div>Invalid URL</div>
    } else if (!this.props.accessCode) {
      const domainId = this._getUrlDomainId()
      pageRender = (
        <ReduxCreateExplorationComponent {...{ ...this.props, domainId } }></ReduxCreateExplorationComponent>)
    } else if (!this.props.isAuth) {
      console.log("RENDERING THE ACCESSCODELOGIN")
      pageRender = (
        <ReduxAccessCodeLoginComponent accessCodeLogin={{
            accessCode: this.props.accessCode
          }} ></ReduxAccessCodeLoginComponent>)
    } else {
      pageRender = <div>All loads complete - starting exploration</div>
    }
    return pageRender
  }
}

export default connect(mapStateToProps, null)(StartContainer)