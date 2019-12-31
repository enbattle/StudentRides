import React, { Component } from 'react'
import axios from 'axios'

class DriverDash extends Component {
  constructor() {
    super()

    this.state = {}
  }

  render () {
    return (
      <div className='dashboard-content'>
        <div className='signup'>
          <h4>Driver Dashboard</h4>
          <p>No Dashboard information yet...</p>
        </div>
      </div>
    )
  }
}

export default DriverDash
