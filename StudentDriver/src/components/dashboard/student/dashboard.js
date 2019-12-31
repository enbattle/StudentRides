import React, { Component } from 'react'
import axios from 'axios'

class StudentDash extends Component {
  constructor() {
    super()

    this.state = {}
  }

  render () {
    return (
      <div className='dashboard-content'>
        <div className='signup'>
          <h4>Student Dashboard</h4>
          <p>No Dashboard information yet...</p>
        </div>
      </div>
    )
  }
}

export default StudentDash
