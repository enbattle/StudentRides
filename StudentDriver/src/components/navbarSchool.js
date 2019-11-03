import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Route, Link } from 'react-router-dom'
import logo from '../logo.svg';
import '../App.css';
import axios from 'axios';
//import bootstrap stuff
// import Navbar from 'react-bootstrap/Navbar';
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
      studentRoster(){
        // <Link to="#" className="btn btn-link text-secondary" onClick={this.addStudent}>
        // <span className="text-secondary">Add Student</span></Link>
        // <Link to="#" className="btn btn-link text-secondary" onClick={this.removeStudent}>
        // <span className="text-secondary">Remove Student</span></Link>

      }
      driverRoster(){
          // <Link to="#" className="btn btn-link text-secondary" onClick={this.addStudent}>
        // <span className="text-secondary">Add Driver</span></Link>
        // <Link to="#" className="btn btn-link text-secondary" onClick={this.removeStudent}>
        // <span className="text-secondary">Remove Driver</span></Link>

    }
    addStudent(){

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
            <div>
                
                <Navbar bg="dark" expand="lg" >
                <div className="col-4" >
                        {loggedIn ? (
                            <section className="navbar-section">
                               
                                {/* should redirect to the students roster page */}
                                <Link to="#" className="btn btn-link text-secondary" onClick={this.studentRoster}>
                                <span className="text-secondary">View Students</span></Link>{/* take user to roster page */}
                                {/* should redirect to the drivers roster page */}
                                <Link to="#" className="btn btn-link text-secondary" onClick={this.driverRoster}>
                                <span className="text-secondary">View Drivers</span></Link>{/* take user to driver page */}
                                <Link to="#" className="btn btn-link text-secondary" onClick={this.logout}>
                                <span className="text-secondary">Logout</span></Link>
                                 


                            </section>
                        ) : (
                                <section className="navbar-section">
                                    <Link to="/" className="btn btn-link text-secondary">
                                        <span className="text-secondary">home</span>
                                        </Link>
                                    <Link to="/login" className="btn btn-link text-secondary">
                                        <span className="text-secondary">login</span>
				                    </Link>
                                    <Link to="/signup" className="btn btn-link">
                                        <span className="text-secondary">sign up</span>
				                    </Link>
                                </section>
                            )}
                    </div>
                    <div className="col-4 col-mr-auto">
                    {/* <div id="top-filler"></div> */}
                        {/* <img style={logoStyle} src={logo} className="App-logo" alt="logo" /> */}
                        
                    </div>

                </Navbar>
                {/* <header className="navbar App-header" id="nav-container">
                    
                </header> */}
            </div>

        );

    }
}

export default Navbar1