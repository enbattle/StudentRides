import React, { Component } from 'react'
import axios from 'axios'
import StudentDash from './student/dashboard'
import DriverDash from './driver/dashboard'
import SchoolAdminDash from './school-admin/dashboard'

class Dashboard extends Component {
  constructor() {
    super()

    this.state = {}
  }

  render () {
    const role = this.props.role
    let dashboardContent
    if (role === 'driver') {
      dashboardContent = <DriverDash />
    } else if (role === 'school-admin') {
      dashboardContent = <SchoolAdminDash />
    } else if (role === 'student') {
      dashboardContent = <StudentDash />
    }
    return (
      <>
        {dashboardContent}
      </>
    )
  }
}

export default Dashboard
