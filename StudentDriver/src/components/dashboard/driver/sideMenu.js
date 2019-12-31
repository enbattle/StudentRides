import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

class DriverSideMenu extends Component {
  constructor () {
    super()

    this.state = {}
  }

  render () {
    return (
      <>
        <Link to='/dashboard' className="nav-link dashboard-link">
          Profile
        </Link>
        <Link to='#' className="nav-link dashboard-link">
          Ride Requests
        </Link>
        <Link to='#' className="nav-link dashboard-link" >
          Ride History
        </Link>
      </>
    )
  }
}

export default DriverSideMenu
