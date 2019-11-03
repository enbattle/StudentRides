import React, { Component } from 'react';
import axios from 'axios'
import { Route, Link } from 'react-router-dom'
// components
import Signup from './components/sign-up'
import LoginForm from './components/login-form'
import Navbar from './components/navbar'
import Home from './components/home'
import StudentRoster from './components/student-roster'
import 'bootstrap/dist/css/bootstrap.min.css'; 

class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      username: null,
      role: null,
    }

    this.getUser = this.getUser.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.updateUser = this.updateUser.bind(this)
  }

  componentDidMount() {
    this.getUser()
  }

  updateUser (userObject) {
    console.log(userObject);
    this.setState(userObject)
  }

  getUser() {
    axios.get('/user/').then(response => {
      console.log('Get user response: ')
      console.log(response.data)
      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: ')
        console.log(response.data.user);
        this.setState({
          loggedIn: true,
          username: response.data.user.username,
          role: response.data.user.roles
        }, () =>{
          console.log(this.state.role);
        }) 
      } else {
        console.log('Get user: no user');
        this.setState({
          loggedIn: false,
          username: null,
          role: null
        })
      }
    })
  }

  render() {
    //
    return (
      <div className="App">
   
        <Navbar role = {this.state.role} updateUser={this.updateUser} loggedIn={this.state.loggedIn} />
        {/* greet user if logged in: */}
        {this.state.loggedIn &&
          <p>Join the party, {this.state.username}!</p>
        }
        {/* Routes to different components */}
        <Route
          path="/" 
          render = {()=> <Home role={this.state.role}/>}

          />
        <Route
          path="/login"
          render={() =>
            <LoginForm
              updateUser={this.updateUser}
            />}
        />
        <Route
          path="/signup"
          render={() =>
            <Signup
              signup={this.signup}
            />}
        />
        <Route
          path="/studentroster"
          render={() =>
            <StudentRoster role = {this.state.role}
            />}
        />

      </div>
    );
  }
}

export default App;