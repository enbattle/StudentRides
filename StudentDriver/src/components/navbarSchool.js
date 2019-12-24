import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Route, Link } from 'react-router-dom'
import '../App.css'
import axios from 'axios'
//import bootstrap stuff
import Nav from 'react-bootstrap/Nav'

import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import logo from '../assets/images/logo.jpg'


class Navbar1 extends Component {
  constructor() {
    super()
    this.logout = this.logout.bind(this)
  }

  logout(event) {
    event.preventDefault()
    console.log('logging out')
    axios.post('/user/logout').then(response => {
      console.log(response.data)
      if (response.status === 200) {
        this.props.updateUser({
          loggedIn: false,
          username: null,
          role: null
        })
      }
    }).catch(error => {
      console.log('Logout error')
    })
    }
   

  componentDidMount(){
    console.log(this.props);
  }
   
  render() {
    const loggedIn = this.props.loggedIn;
    console.log('navbar render, props: ')
    console.log(this.props);
    const logoStyle = {//style the 
      width: 40

    }
    
    return (
      <div className="navbar-section">
        <Navbar bg="dark" variant="dark" expand="lg"  color="white!important">
          <Navbar.Brand>
            <Link  to="/" >
              <img src={logo} style={{width: 60}}></img>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav ">
            {loggedIn ? (
              <Nav className="navbar-section ">
                <Link to="/dashboard" className="btn btn-secondary" >
                  <span className="text-light" >Dashboard</span>
                </Link>

                <Link  to="" className="btn btn-link text-secondary" onClick={this.logout}>
                  <span className="text-light" >Logout</span>
                </Link>
                <div className="profile-image">
                  <img src={this.props.profileImage} alt="profile image" />
                </div>
              </Nav>
              
                ) : (  
                  
              <Nav className="mr-sm-2">
                <NavDropdown title="Sign Up" id="basic-nav-dropdown" >
                  <NavDropdown.Item href="/signup/driver">Driver</NavDropdown.Item>
                  <NavDropdown.Item href="/signup/school-admin">School Admin</NavDropdown.Item>
                </NavDropdown>
                <Link  to="/login" className="btn btn-link text-light">
                  <span className="text-light" >Login</span>
                </Link>

              </Nav>  
              )}
            
          </Navbar.Collapse>
        
        </Navbar>

      </div>

    );

  }
}

export default Navbar1

