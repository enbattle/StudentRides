import React, { Component } from 'react'
import '../../assets/stylesheets/sideBarMenu.css'
import {Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Sidebar from "react-sidebar";
import StudentSideMenu from './student/sideMenu'
import AdminSideMenu from './school-admin/sideMenu'
import DriverSideMenu from './driver/sideMenu'

const sidebarStyle = {
  sidebar: {
    paddingTop: '200px',
    width: '100%',
    backgroundColor: '#b8bdc0'
  },
  overlay: {
    backgroundColor: 'transparent' 
  }
}
class SideMenu extends Component {
  constructor () {
    super()
    this.state = {
      sidebarOpen: true
    }
    this.toggleSidebar = this.toggleSidebar.bind(this)
  }

  toggleSidebar () {
    this.setState({
      sidebarOpen: !this.state.sidebarOpen
    })
  }

  render () {
    console.log(this.props);
    const role = this.props.role
    let sideMenu
    if (role === 'driver') {
      sideMenu = <DriverSideMenu />
    } else if (role === 'school-admin') {
      sideMenu = <AdminSideMenu />
    } else if (role === 'student') {
      sideMenu = <StudentSideMenu />
    }
    return (
      <div className ="sidenav">
        <Sidebar
          sidebar={<div>
            <h1 className="dashboard-title">EdVoR</h1>
            {sideMenu}
          </div>}
          open={this.state.sidebarOpen}
          onSetOpen={this.toggleSidebar}
          styles={sidebarStyle}
        >
          <div className='sidebarToggle' onClick={() => this.toggleSidebar()}>
            <i className='fas fa-bars'></i>
          </div>
        </Sidebar>
      </div>
    )
  }
}

export default SideMenu
