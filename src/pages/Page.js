
import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  EXPLORATION_PAGE_UNLOAD
} from '../forms/actionTypes'

// Returns a HOC that dispatches { page_load_action } on-mount
export function withPageLoad(WrappedComponent, { page_load_action }) {
  const mapDispatchToProps = (dispatch) => {
    console.log('got new props to watch??')
    return {
      onPageLoad: () => {
        // Unload the page first
        //dispatch({type: EXPLORATION_PAGE_UNLOAD})

        console.log('dispatching...', page_load_action)
        console.log('to: ', WrappedComponent)
        
        // Then load the desired one
        dispatch({type: page_load_action})
      },

      // TODO: We need to check what kind of page it is and load that page as Current
      primeForm: (form_action_type) => {
        dispatch({type: form_action_type})
      }
    }
  };
  class ComponentWithPageLoad extends Component {
    componentWillMount() {
      this.props.onPageLoad()
    };
    render() {
      return <WrappedComponent {...this.props}></WrappedComponent>;
    }
  }
  return connect(null, mapDispatchToProps)(ComponentWithPageLoad)
}