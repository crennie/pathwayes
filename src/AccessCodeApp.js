import React, { Component } from 'react'
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import { store } from './store'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'

import './static/css/header.css'
import './static/css/footer.css'
import './static/css/font.css'
import './static/css/color.css'
import './static/css/App.css'


import { asPage, withRedirects, withPageLoad } from './pages/ReduxPage'

import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import StartContainer from './containers/StartContainer'
import ExplorationInitial from './components/exploration/ExplorationInitial'
import ExplorationComplete from './components/exploration/ExplorationComplete'

import {
  APP_LOADED,
  EXPLORATION_PAGE_TERMS_SELECTION,
  EXPLORATION_PAGE_TERMS_COMPLETE

} from './actions/actionTypes'


const mapStateToProps = state => {
  return {
    appLoaded: state.common.appLoaded
  }
};

class AccessCodeApp extends Component {
  render() {
    // TODO: How to detect no domain start here??
    if (!this.props.appLoaded) {
      return null
    }
    
    // TODO: Any error handling needed here?
    return (
      <div className="AccessCodeApp">
        <Header></Header>
        <div id="main">
          <div className="max_width">
            <div id="main_abs">
              <div id="main_rel">
                <Switch>
                  <Route exact path="/exploration/terms" component={
                      asPage(ExplorationInitial, {
                          page_load_action: EXPLORATION_PAGE_TERMS_SELECTION
                      }) }
                    />
                  <Route exact path="/exploration/end" component={
                      asPage(ExplorationComplete, {
                        page_load_action: EXPLORATION_PAGE_TERMS_COMPLETE
                      }) }
                    />
                  <Route path='/start' component={ withRedirects(StartContainer)} />
                  <Route path='/launch.html' render={ () => {
                      return (
                        <Link id="launch_btn" to={`/start?type=new&domain=1000`}>Start TEST</Link>
                      )
                    } }
                    />
                  <Route path='/error.html' render={ () => {
                      return (
                        <div>
                          <p>There was an error with the request.</p>
                          <p>Please check the logs, or try again:</p>
                          <p style={ {marginTop: '15px'} }>
                            <Link id="launch_btn" to={`/start?type=new&domain=1000`}>Start TEST</Link>
                          </p>
                        </div>
                      )
                    } }
                  />
                  <Route>
                    <Redirect to='/launch.html' />
                  </Route>
                </Switch>
              </div>
            </div>
          </div>
        </div>
        <Footer></Footer>
      </div>
    )
  }
}

export default connect(mapStateToProps, null)( withRedirects(withPageLoad(AccessCodeApp, {page_load_action: APP_LOADED})) )