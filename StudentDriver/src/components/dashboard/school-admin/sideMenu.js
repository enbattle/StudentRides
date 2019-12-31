import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

class AdminSideMenu extends Component {
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
        <Link to='/dashboard/student-roster' className="nav-link dashboard-link">
          Student Roster
        </Link>
        <Link to='/dashboard/driver-roster' className="nav-link dashboard-link" >
          Driver Roster
        </Link>
      </>
    )
  }
}

export default AdminSideMenu
