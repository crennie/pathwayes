import React, { Component } from 'react'
import { Switch, Route, Redirect, Link } from 'react-router-dom';

import './static/css/header.css'
import './static/css/footer.css'
import './static/css/font.css'
import './static/css/color.css'
import './static/css/App.css'


import './static/css/Login.css'
import './static/css/Logout.css'

import Header from './components/header/Header'
import Footer from './components/footer/Footer'

import LoginComponent from './components/login/Login'
import LogoutComponent from './components/logout/Logout'
import ExplorationInitialComponent from './components/exploration/ExplorationInitial'

import { withPageLoad } from './pages/Page'

import {
  EXPLORATION_PAGE_TERMS_SELECTION,
  EXPLORATION_PAGE_TERMS_COMPLETE
} from './forms/actionTypes'

const isAuthorized = () => localStorage.getItem('token')

class ApolloApp extends Component {
  render() {
    return (
      <div className="ApolloApp">
        <Switch>

          <Route path='/start/:domainId' component={LoginComponent} />

          {/* If no domains entered, go to a default domain? */}
          <Route path='/start' render={ props => <Redirect to='/start/100' /> } />
          <Route path='/logout' component={LogoutComponent} />
          <Route path='/exploration/' render={ () => (
            <div>
              { !isAuthorized() ? <Redirect to='/start' /> : null}
              
              <Header></Header>
              <div id="main">
                <div className="max_width">
                  <div id="main_abs">
                    <div id="main_rel">
                      <Switch>
                        <Route path='/exploration/:id/instructions' component={
                            withPageLoad(ExplorationInitialComponent, { page_load_action: EXPLORATION_PAGE_TERMS_SELECTION }) } />
                        <Route path='/exploration/:id/end' component={
                            withPageLoad(ExplorationInitialComponent, { page_load_action: EXPLORATION_PAGE_TERMS_COMPLETE }) } />
                      </Switch>
                    </div>
                  </div>
                </div>
              </div>
              <Footer></Footer>
            </div>
           ) } /> 
        </Switch>
      </div>
    )
  }
}

export default ApolloApp