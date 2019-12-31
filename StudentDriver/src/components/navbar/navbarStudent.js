import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class StudentNavbar extends Component {

  render () {
    return (
      <div>
        <section className="navbar-section">
          <Link to="/" className="btn btn-link text-secondary">
            <span className="text-secondary">Request</span>
          </Link>
          <Link to="/" className="btn btn-link text-secondary">
            <span className="text-secondary">Cancel</span>
          </Link>
        </section>
      </div>
    );
  }
}

export default StudentNavbar