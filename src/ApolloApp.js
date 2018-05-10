import React, { Component } from 'react'
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import { push } from 'react-router-redux'

import './static/css/header.css'
import './static/css/footer.css'
import './static/css/font.css'
import './static/css/color.css'
import './static/css/App.css'


import './static/css/Login.css'
import './static/css/Logout.css'


//import { asPage, withRedirects, withPageLoad } from './pages/ReduxPage'

import Header from './components/header/Header'
import Footer from './components/footer/Footer'

//import StartContainer from './components/start/Start'
//import StartContainer from './containers/StartContainer'
//import ExplorationInitial from './components/exploration/ExplorationInitial'
//import ExplorationComplete from './components/exploration/ExplorationComplete'


import LoginComponent from './components/login/Login'
import LogoutComponent from './components/logout/Logout'
import ExplorationInitialComponent from './components/exploration/ExplorationInitial'
//import ExplorationEndComponent from './components/exploration/ExplorationEnd'

/* TODO: Maybe just handle this in the App routing instead??
const withAuth(WrappedComponent) {
  class ComponentWithAuth extends Component {
    isAuthorized() {
      return localStorage.getItem('token')
    };
    render() {
      //<WrappedComponent {...this.props}></WrappedComponent>
    }
  }
  return WrappedComponent
}
*/

const isAuthorized = () => localStorage.getItem('token')

class ApolloApp extends Component {

  /*
  onLoginComplete(loginResult) {
    // TODO: Make sure access code, token, and userExplorationId are set?
    console.log(this.state.current_exploration_id, loginResult)
    const token = loginResult.data.accessCodeLogin
    if (!token) {
      console.log("[Error] Login complete with no token")
      // TODO: redirect to logout?
    }

    localStorage.setItem('token', token)
    
    if (!this.state.current_exploration_id) {
      // No current exploration set, so do a lookup and then redirect
      // TODO: Perform the lookup query here??

    }
  };
  
  _startExploration() {
    this.props.history.push(`/exploration/${this.state.current_exploration_id}/instructions`)
  };
  */

  render() {
    return (
      <div className="ApolloApp">
        <Switch>

          {/* TODO: We can move this to component soon maybe?? */}
          <Route path='/start/:domainId' component={LoginComponent} />

          {/* If no domains entered, go to a default domain */}
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
                        <Route path='/exploration/:id/instructions' component={ExplorationInitialComponent} />
                        {/*<Route path='/exploration/:id/end' component={ExplorationEndComponent} />*/}
                      </Switch>
                        {/*
                        <Switch>
                        <Route path='/start' component={StartContainer} />
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
                      */}
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

//export default connect(mapStateToProps, null)( withRedirects(withPageLoad(AccessCodeApp, {page_load_action: APP_LOADED})) )
export default ApolloApp