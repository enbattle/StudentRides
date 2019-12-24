import React, { Component } from 'react'
import '../assets/stylesheets/sideBarMenu.css'
import {Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'

class SideMenu extends Component {
  constructor(){
    super()
    
  }
  
  render () {
    return (
      <div className="sidenav">
        <Link to='/dashboard/student-roster' className="btn btn-link">
          <span className="text-light" >Student Roster</span>
        </Link>
        <Link to='/dashboard/driver-roster' className="btn btn-link" >
          <span className="text-light" >Driver Roster</span>
        </Link>
      </div>
    )
  }
}

export default SideMenu
