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
                                <Link to="#" className="btn btn-link text-secondary" onClick={this.logout}>
                                <span className="text-secondary">Logout</span></Link>

                            </section>
                        ) : (
                                <section className="navbar-section">
                                    <Link to="/" className="btn btn-link text-secondary">
                                        <span className="text-secondary">Request</span>
                                        </Link>
                                    <Link to="/" className="btn btn-link text-secondary">
                                        <span className="text-secondary">Cancel</span>
				                    </Link>
                                    
                                </section>
                            )}
                    </div>
                    <div className="col-4 col-mr-auto">                        
                    </div>

                </Navbar>              
            </div>

        );

    }
}

export default Navbar1