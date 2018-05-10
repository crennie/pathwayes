import React, { Component } from 'react'
import PropTypes from 'prop-types';

class AutorunMutation extends Component {
  componentDidMount() {
    if (this.props.shouldRun) {
      this.props.mutateFn()
    }
  };
  render() {
    return this.props && this.props.children ? this.props.children : null
  }
}

AutorunMutation.propTypes = {
  mutateFn: PropTypes.func,
  shouldRun: PropTypes.bool
}

export default AutorunMutation
