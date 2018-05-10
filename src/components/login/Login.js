
import React, { Component } from 'react'

import gql from "graphql-tag"
import { withApollo, graphql, compose, Mutation } from 'react-apollo'

import { FETCH_USER_EXPLORATION } from '../../queries'

const createExplorationMutation = gql`
  mutation ($domainId: Int!, $date: String!) {
    createUserExploration(userExploration: {
      domainId: $domainId,
      explorationCompletionDate: $date
    }) {
      userExplorationId
      domainId
      acceptedTerms
      accessCode
      createdDate
      modifiedDate
    }
  }`

const accessCodeLoginMutation = gql`
  mutation ($accessCode: String) {
    accessCodeLogin(accessCode: $accessCode)
  }`


const userExplorationQuery = gql`
  query {
    userExploration(accessCode: $accessCode)
  }
`


class LoginComponent extends Component {
  state = {
    validated_domain: null,

    loading_create: false,
    loading_login: false,

    // TODO: Do a minimum loading time animation??
  }
  componentWillMount() {
    console.log(this.props)
    const domainId = this.props.match.params.domainId
    console.log(domainId)
    this.setState({ validated_domain: !!domainId })
  };

  onStartNew() {
    this.setState({ loading_create: true })
    this.props.createExploration({ variables: { domainId: this.props.match.params.domainId, date: '2019-01-01' }}).then( result => {
      console.log(result)
      const { accessCode } = result.data.createUserExploration
      this.setState({ loading_create: false, loading_login: true })
      this.props.login({ variables: { accessCode } }).then( result => {
        console.log(localStorage.getItem('token'))

        console.log(this)

        console.log(this.props.client)

        const { currentExplorationId } = this.props.client.readQuery({ query: gql`query { currentExplorationId }` })
        console.log(currentExplorationId)
        
        if (!currentExplorationId) {
          console.log("[Error] No exploration ID found, this shouldn't happen in Start")
        } else {
          this.props.history.push(`/exploration/${currentExplorationId}/instructions`)
        }
      })
    })
  };

  handleAccessCodeLoginResponse(result) {
    console.log(result, this)
    // TODO: Parse errors and unauth here=>
    if (result.errors) {
      console.log('Received errors from accessCodeLogin')
      return
    }

    if (result.data == 'Unauthorized')   {
      // TODO: Redirect to the logout page?
    }

    const token = result.data.accessCodeLogin
    if (!token) {
      console.log("[Error] Login complete with no token")
      // TODO: redirect to logout?
    }

    this.props.saveAuthToken(token)
    
    if (!this.props.currentExplorationId) {
      console.log("No exploration id, do a lookup here")

    }
  }

  render() {
    // TODO: Is there any sort of "loading" we want to do??
    if (this.state.validated_domain === null) {
      return;
    }
    if (this.state.validated_domain === false) {
      return <div>Error: invalid domain</div>
    }

    return (
      <div id="login-container">
        <div className="login-panel-container">
          <div id="login-panel-logo"></div>   
          <div id="login-panel">

            <div className="login-panel-content">
              { this.state.loading_create ? <div>Creating...</div> :
                (<button type="button" id="login-new-btn" className=""
                    onClick={this.onStartNew.bind(this) } >
                  Start New
                </button>)
              }
              
              <div className="login-instructions">
                or enter your access code to continue
              </div>

              <Mutation 
                mutation={accessCodeLoginMutation}
                onCompleted={this.handleAccessCodeLoginResponse}
                >
                {(login, { data, loading, error, called }) => {
                  console.log(this, data, loading, error, called, login)
                  const handleLogin = (e) => {
                    e.preventDefault()
                    const input_field = document.getElementById('login-input')
                    const accessCode = input_field ? input_field.value : null
                    const accessCodeMatch = /^\w{6}$/
                    let form_error
                    if (accessCode === '') {
                      form_error = 'enter access code'
                    } else if (!accessCode.match(accessCodeMatch)) {
                      form_error = 'invalid access code'
                    }
                    // TODO: Add some handling on access code

                    if (form_error) {
                      this.setState({form_error})
                    }
                    if (!form_error) {
                      login({ variables: {accessCode: e.currentTarget.value} })
                    }
                  }
                  return (
                    <div>
                      <div>
                        <label className="login-label">Access Code</label>
                      </div>
                      { !called && (this.state.loading_login || loading) ? (<div>Loading...</div>) : (
                        <div>
                          <input id="login-input" type="text" />
                          <button id="login-btn" type="submit" onBlur={() => {
                            this.setState({form_error: null})
                          }} onClick={handleLogin}></button>
                          {error ? <p className="error-block">{error}</p> : null}
                          {this.state.form_error ? <p className="error-block">{this.state.form_error}</p> : null}
                        </div>
                      ) }
                    </div>
                  )
                }}
              </Mutation>
            </div>

          </div>
        </div>
      </div>
    )
  }
}

// TODO: Extract these local state queries into files??
export default compose(
  graphql(createExplorationMutation, {
    name: 'createExploration',
    options: {
      update: (store, { data: { createUserExploration } }) => {
        console.log(store, createUserExploration)
        const currentExplorationId = createUserExploration.userExplorationId
        store.writeQuery({ query: gql`query { currentExplorationId }`, data: { currentExplorationId } })

        // Cache the exploration we just created.  Need to do a read first to prime the cache object to write 
        const data = store.readQuery({ query: FETCH_USER_EXPLORATION, variables: { explorationId: currentExplorationId } })
        Object.assign(data.userExploration, createUserExploration)
        store.writeQuery({ query: FETCH_USER_EXPLORATION, data })
      }
    }
  }),
  graphql(accessCodeLoginMutation, {
    name: 'login',
    options: {
      /* TODO: Any way to refresh the currentUserExploration here??
      / Make sure we refresh the accessCode item we have
      refetchQueries: [{
        query: gql`query { userExploration(id: "")}`
      }],
      */
      update: (store, { data: { accessCodeLogin } }) => {
        console.log(store, accessCodeLogin)
        // TODO: What to do if Unathorized on login?
        localStorage.setItem('token', accessCodeLogin)
      }
    }
  })
)(withApollo(LoginComponent))