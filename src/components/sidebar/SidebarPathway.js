import React, { Component } from 'react'

class SidebarPathway extends Component {
  render() {
    return (
      <li className="path_basket" key={this.props.title}>
        <h4><span>{this.props.title}</span>{/* TODO: HIDE CLOSE BUTTON<i></i>*/}</h4>
        <div>
          <p>
            <span className="progress_bg"></span>
            {this.props.description}
          </p>
        </div>
      </li>
    )
  }
}
export default SidebarPathway