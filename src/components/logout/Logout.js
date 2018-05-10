import React, { Component } from 'react'

import { withApollo } from 'react-apollo'

class LogoutComponent extends Component {
  state = {
    loading: false
  };
  componentWillMount() {
    this.setState({ loading: true })
    console.log(this.props)
    // Clear the store and token when this page is hit
    this.props.client.resetStore()
    localStorage.removeItem('token')

    console.log(localStorage.getItem('token'))

    console.log(this.props.client)
    setTimeout(( () => {
      this.setState({ loading: false })
    }).bind(this), 2000)
  };
  
  handleStartClick(e) {
    // TODO: Should we do a push or a replace here?? Also, what domain/org are we targetting?
    this.props.history.replace('/start/100')
  };

  render() {
    return (
      <div id="logout-container">
        <div className="logout-panel-container">
          <div id="logout-panel-logo"></div>
          { this.state.loading ?
              <div id="logout-loading">Logging out...</div>
            : (
              <div id="logout-panel-content">
                <span>You are now logged out</span>
                <button type="button" onClick={this.handleStartClick.bind(this)} className="btn" id="logout-login-btn">Log back in</button>
              </div>
            )
          }
        </div>
      </div>
    )
  }
}

export default withApollo(LogoutComponent)

