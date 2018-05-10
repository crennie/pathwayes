import React from 'react'
import { accessCodeLoginType } from '../../types'

import AutorunMutation from '../mutation/AutorunMutation'
import { connect } from 'react-redux'

import gql from "graphql-tag"
import { Mutation } from "react-apollo"

const AccessCodeLogin = ({ accessCode, loginComplete }) => (
  <Mutation
      mutation={gql`
          mutation {
            accessCodeLogin(accessCode:"${accessCode}"),
            {
              data
            }
          }`}

      onCompleted={loginComplete}
    >
    {(login, { data, loading, error, called }) => {
      console.log(data, loading, error, called, login)

      return (
        <div>
          <p>Called: {called ? 'True' : 'False'}</p>
          {!error && <p>Loading...</p>}
          {error && <p>Error</p>}
          {error ? error : null}
          <AutorunMutation
              mutateFn={login}
              shouldRun={!called}
            >
          </AutorunMutation>
        </div>
      )
    }
  }
  </Mutation>
)

AccessCodeLogin.propTypes = { ...accessCodeLoginType.isRequired }

export default AccessCodeLogin