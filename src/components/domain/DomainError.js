import React from 'react'

export default ({errorMsg}) => {
  return (
    <div className="">
      <p>Error loading the domain information:</p>
      <br/>
      <p>{ errorMsg }</p>
    </div>
  )
}