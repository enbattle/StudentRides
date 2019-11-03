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
            <div className="navbar-section justify-content-center">
                <Navbar className="justify-content-center " bg="dark" variant="dark" expand="lg">
                < Navbar.Brand href="/home">Student Rides</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                {loggedIn ? (
                    <Nav className="navbar-section justify-content-center">
                        <Link to="student-roster" className="btn btn-link text-secondary" >
                        <span className="text-secondary" >View Students</span>
                    </Link>
                    <Link  to="driver-roster" className="btn btn-link text-secondary" >
                        <span className="text-secondary" >View Drivers</span></Link >
                     <Link  to="" className="btn btn-link text-secondary" onClick={this.logout}>
                        <span className="text-secondary" >Logout</span></Link >

                    </Nav>
                    
                        ) : (  
                           
                     <Nav className="navbar-section justify-content-center">
                     <Link  to="/" className="btn btn-link text-secondary">
                            <span className="text-secondary" >Home</span>
                        </Link >
                        <Link  to="/login" className="btn btn-link text-secondary">
                            <span className="text-secondary" >Login</span>
                        </Link >
                        <Link  to="/signup" className="btn btn-link">
                            <span className="text-secondary">Sign Up</span>
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

