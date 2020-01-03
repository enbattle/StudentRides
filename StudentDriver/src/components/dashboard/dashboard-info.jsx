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

  static getDerivedStateFromProps (nextProps, prevState) {
    console.log(nextProps);
    console.log(prevState);
    if (nextProps.school !== prevState.school && nextProps.role === 'school-admin') {
      return { ...nextProps.school }
    } else {
      return null
    }
  }

  render () {
    const role = this.props.role
    let dashboardContent
    if (role === 'driver') {
      dashboardContent = <DriverDash />
    } else if (role === 'school-admin') {
      dashboardContent = <SchoolAdminDash {...this.state} />
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
