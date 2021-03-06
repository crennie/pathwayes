import React from 'react'

import { withRouter } from 'react-router-dom'

// TODO: Get these working with or without jquery?
//import { openModal, closeModal } from '../modal/Modal'

const Header = (props) => {
  const handleCloseClick = (e) => {
    /*e.stopPropagation();
    var title = 'Logout';
    var body = 'Are you sure you want to log out?';
    var link = 'Log out';
    openModal(title, body, link);
    //menu_close();
    // TODO: Maybe show a modal
    */
    props.history.push('/logout')
  }
  return (
    <header id="header">
      <div className="max_width">
        <span id="logo"></span>
        <div className="controls">
          <button id="help_btn"></button>
          <button id="menu_btn"></button>
          <button id="close_btn" onClick={handleCloseClick}></button>
          <ul id="menu">
            <li className="first">Menu option1</li>
            <li>Menu option2</li>
            <li>Menu option3</li>
            <li>Menu option4</li>
          </ul>
        </div>
      </div>
    </header>
  )
}

export default withRouter(Header)