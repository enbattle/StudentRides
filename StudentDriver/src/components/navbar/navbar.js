import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Route, Link } from 'react-router-dom'
import '../../App.css'
import axios from 'axios'
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
  MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon } from "mdbreact";
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import logo from '../../assets/images/logo.jpg'
import DriverNavbar from './navbarDriver'
import StudentNavbar from './navbarStudent'
import SchoolAdminNavbar from './navbarSchool'

class SiteNavbar extends Component {
  constructor () {
    super()
    this.logout = this.logout.bind(this)
  }

  logout (event) {
    event.preventDefault()
    axios.post('/user/logout').then(response => {
      if (response.status === 200) {
        this.props.updateUser({
          loggedIn: false,
          username: null,
          email: '',
          firstName: '',
          lastName: '',
          phoneNumber: '',
          profileImage: '',
          role: null,
          school: {}
        })
        window.location.href = '/'
      }
    }).catch(error => {
      console.log('Logout error', error)
    })
  }

  render () {
    const loggedIn = this.props.loggedIn
    const role = this.props.role
    let navbarContent
    if (loggedIn) {
      if (role === 'driver') {
        navbarContent = <DriverNavbar />
      } else if (role === 'school-admin') {
        navbarContent = <SchoolAdminNavbar />
      } else if (role === 'student') {
        navbarContent = <StudentNavbar />
      }
    } else {
      navbarContent = null
    }
    return (
      <div className="navbar-section">
        <Navbar bg="dark" variant="dark" expand="lg"  color="white!important" className='home'>
          <Navbar.Brand>
            <Link  to="/" >
              <img src={logo} style={{width: 60}}></img>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav ">
            {loggedIn ? (
              <MDBNavbarNav right>
                {navbarContent}
                <MDBNavItem>
                  <Link to="/dashboard" className="" >
                    <span className="text-light" >Dashboard</span>
                  </Link>
                </MDBNavItem>
                <MDBNavItem>
                  <Link  to="/" className="" onClick={this.logout}>
                    <span className="text-light" >Logout</span>
                  </Link>
                </MDBNavItem>
                <MDBNavItem>
                  <div className="profile-image">
                    <img src={this.props.profileImage} alt="profile image" />
                  </div>
                </MDBNavItem>
              </MDBNavbarNav>

            ) : (

              <MDBNavbarNav right>
                <MDBNavItem>
                  <NavDropdown title="Sign up" id="basic-nav-dropdown" className='text-light' >
                    <NavDropdown.Item href="/signup/driver">Driver</NavDropdown.Item>
                    <NavDropdown.Item href="/signup/school-admin">School Admin</NavDropdown.Item>
                  </NavDropdown>
                </MDBNavItem>
                <MDBNavItem>
                  <Link to="/login" className="text-light">
                    <span className="text-light" >Login</span>
                  </Link>
                </MDBNavItem>
              </MDBNavbarNav>
            )}
          </Navbar.Collapse>
        </Navbar>

      </div>
    )
  }
}

export default SiteNavbar
