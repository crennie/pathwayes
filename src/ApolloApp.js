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
import ExplorationProgressComponent from './components/exploration/ExplorationProgress'

import Sidebar from './components/sidebar/Sidebar'

import { withPageLoad } from './pages/Page'

import {
  EXPLORATION_PAGE_TERMS_SELECTION,
  EXPLORATION_PAGE_UNLOAD
} from './forms/actionTypes'

const isAuthorized = () => localStorage.getItem('token')

class ApolloApp extends Component {
  render() {

    const ExplorationInitial = withPageLoad(ExplorationInitialComponent, { page_load_action: EXPLORATION_PAGE_TERMS_SELECTION }),
      ExplorationProgress = withPageLoad(ExplorationProgressComponent, { page_load_action: EXPLORATION_PAGE_UNLOAD })
    return (
      <div className="ApolloApp">
        <Switch>

          <Route path='/start/:domainId' component={LoginComponent} />

          {/* If no domains entered, go to a default domain? */}
          <Route path='/start' render={ (props) => <Redirect to='/start/1' /> } />
          <Route path='/logout' component={LogoutComponent} />
          <Route path='/exploration/' render={ () => (
            <div>
              { !isAuthorized() ? <Redirect to='/start' /> : null}
              
              <Header></Header>
              <div id="main">
                <div className="max_width">
                  <div id="main_abs">
                    <Switch>
                      <Route path='/exploration/:id/instructions' render={ (props) => (
                          <div id="main_rel">
                            <ExplorationInitial {...props}></ExplorationInitial>
                          </div>
                        )} />
                      {/* TODO: MAYBE CHECK FOR ENDING PAGE HERE?? OR DO IT IN EXPLORATION PROGRESS COMPONENT? */}
                      <Route path='/exploration/:id/progress/:nodeId' render={ (props) => (
                          <div id="main_rel">
                            <Sidebar {...props}></Sidebar>
                            <ExplorationProgress {...props}></ExplorationProgress>
                          </div>
                        )} />
                      
                      <Route path='/exploration/:id/' render={ (props) => (
                          <Redirect to={`/exploration/${props.match.params.id}/instructions`} />
                        )} />
                    </Switch>
                  </div>
                </div>
              </div>
              <Footer></Footer>
            </div>
           ) } /> 
           <Route path='/' render={ props => <Redirect to='/start/1' /> } />
        </Switch>
      </div>
    )
  }
}

export default ApolloApp