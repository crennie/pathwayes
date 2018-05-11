
import React, { Component } from 'react'
import { connect } from 'react-redux'


// Returns a HOC that dispatches { page_load_action } on-mount
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