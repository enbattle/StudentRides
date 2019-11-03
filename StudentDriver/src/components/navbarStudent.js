import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Route, Link } from 'react-router-dom'
import logo from '../logo.svg';
import '../App.css';
import axios from 'axios';
//import bootstrap stuff
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';



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
                < Navbar.Brand href="/">Student Rides</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className="justify-content-center" id="basic-navbar-nav ">
                {loggedIn ? (
                    <Nav className="navbar-section ">
                        <Link to="student-roster" className="btn btn-secondary" >
                        <span className="text-light" >Request a ride</span>
                    </Link>
                    <Link  to="driver-roster" className="btn btn-link text-secondary" >
                        <span className="text-light" >Cancel a ride</span></Link >
                     <Link  to="" className="btn btn-link text-secondary" onClick={this.logout}>
                        <span className="text-light" >Logout</span></Link >

                    </Nav>
                    
                        ) : (  
                           
                     <Nav className="navbar-section ">
                     <Link  to="/" className="btn btn-link text-light">
                            <span className="text-light" >Home</span>
                        </Link >
                        <Link  to="/login" className="btn btn-link text-light">
                            <span className="text-light" >Login</span>
                        </Link >
                    </Nav>  
                    )}
                   
                </Navbar.Collapse>
                
                </Navbar>

            </div>

        );

    }
}

export default Navbar1

