import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class SchoolAdminDash extends Component {
  constructor() {
    super()

    this.state = {}
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    console.log(nextProps);
    console.log(prevState);
    if (nextProps !== prevState) {
      return { ...nextProps }
    } else {
      return null
    }
  }

  render () {
    return (
      <div className='dashboard-content'>
        <div className='signup'>
          <h1>School Admin Dashboard</h1>
          {this.state.schoolName != null &&
            <div className='school-info'>
              <h2>{this.state.schoolName}</h2>
              <p>This is a small and quaint school of 200 students. We pride ourselves in being the first to ever attempt to use this application</p>
              <div>
                <Link className='btn btn-primary' to='/dashboard/student-signup'>Add a Student</Link>
              </div>
            </div>
          }
          {this.state.schoolName == null &&
            <>
              <h2>You don't have a school yet!</h2>
              <div>
                <Link className='btn btn-primary' to='/dashboard/school-signup'>Create a school</Link>
              </div>
            </>
          }
        </div>
      </div>
    )
  }
}

export default SchoolAdminDash
