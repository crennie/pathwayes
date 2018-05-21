import React, { Component } from 'react'

import { withApollo } from 'react-apollo'

// TODO: Do this with graphql wrapper once not offline only
import { FETCH_USER_STEPS } from '../../queries'

class EndingComponent extends Component {
  state = {
    userSteps: []
  }
  componentDidMount() {
    const response = this.props.client.readQuery({ query: FETCH_USER_STEPS })

    console.log(response)
    this.setState({ userSteps: response.userSteps })
  }

  render() {
    return (
      <div>
        <h2>Ending</h2>
        <div><b>{this.props.questionTitle}</b></div>
        <div>{this.props.questionTitleText}</div>

        {this.state.userSteps && this.state.userSteps.length ? (
          <ul>
            {this.state.userSteps.map((s, index) => (
              <li key={index}>{index+1} - {s.answer}</li>
            )
            )}
          </ul>
        ) : <div>No steps recorded this session</div>}
      </div>
    )
  }
}

export default withApollo(EndingComponent)