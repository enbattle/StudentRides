import React, { Component } from 'react';
import axios from 'axios'
import { Route, Link } from 'react-router-dom'
// components
import Signup from './components/sign-up'
import SideMenu from './components/dashboard'
import LoginForm from './components/login-form'
import NavbarSchool from './components/navbarSchool'
import NavbarStudent from './components/navbarStudent'
import NavbarDriver from './components/navbarDriver'
import Home from './components/home'
import StudentRoster from './components/student-roster'
import DriverRoster from './components/driver-roster'
import 'bootstrap/dist/css/bootstrap.min.css';//
import DriverSignup from './components/driver-signup';

class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      username: null,
      email: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      profileImage: '',
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
          profileImage: response.data.user.profileImage,
          email: response.data.user.email,
          firstName: response.data.user.firstName,
          lastName: response.data.user.lastName,
          role: response.data.user.roles
        }, () =>{
          console.log(this.state.role);
        }) 
      } else {
        console.log('Get user: no user');
        this.setState({
          loggedIn: false,
          username: null,
          email: '',
          firstName: '',
          lastName: '',
          phoneNumber: '',
          profileImage: '',
          role: null,
        })
      }
    })
  }

  render() {
    //
    return (
      <div className="App">
   
        <NavbarSchool role = {this.state.role} profileImage={this.state.profileImage} updateUser={this.updateUser} loggedIn={this.state.loggedIn} />
        {/* greet user if logged in: */}
        {this.state.loggedIn &&
          <p>Join the party, {this.state.username}!</p>
        }
        {/* Routes to different components */}
        <Route
          exact path="/" 
          render={() =>
            <Home 
              role={this.state.role}
            />}

        />
        <Route
          exact path="/login"
          render={() =>
            <LoginForm
              updateUser={this.updateUser}
            />}
        />
        <Route
          exact path="/signup/school-admin"
          render={() =>
            <Signup role='school-admin'
              signup={this.signup}
            />}
        />
        <Route
          exact path="/signup/driver"
          render={() =>
            <Signup role='driver'
              signup={this.signup}
            />}
        />
        <Route
          path="/dashboard"
          render={() =>
            <SideMenu
            />}
        />
        <Route
          exact path="/dashboard/student-roster"
          render={() =>
            <StudentRoster role = {this.state.role}
            />}
        />
        <Route
          exact path="/dashboard/driver-roster"
          render={() =>
            <DriverRoster
            />}
        />
        <Route
          exact path="/signup/driver-registration"
          render={() =>
            <DriverSignup
            />}
        />
      </div>
    );
  }
}

export default App;