import React, { Component } from 'react';
import axios from 'axios'
import { Route, Link } from 'react-router-dom'
// components
import Signup from './components/authentication/sign-up'
import SideMenu from './components/dashboard/dashboard'
import LoginForm from './components/authentication/login-form'
import SiteNavbar from './components/navbar/navbar'
import SimpleMap from './components/simplemap'
import Home from './components/home'
import SchoolSignUp from './components/authentication/school-signup'
import StudentRoster from './components/dashboard/student-roster'
import DriverRoster from './components/dashboard/driver-roster'
import DriverSignup from './components/authentication/driver-signup';
import ProtectedRoute from './components/withAuth';
import Dashboard from './components/dashboard/dashboard-info'
import Footer from './components/footer'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap-css-only/css/bootstrap.min.css'
import 'mdbreact/dist/css/mdb.css'

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
      school: {}
    }

    this.getUser = this.getUser.bind(this)
    this.getSchool = this.getSchool.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.updateUser = this.updateUser.bind(this)

  }

  async componentDidMount () {
    await this.getUser()
    if (this.state.loggedIn) {
      console.log(this.state)
      await this.getSchool()
      console.log(this.state);
    }
  }

  updateUser (userObject) {
    this.setState(userObject)
  }

  async getUser () {
    await axios.get('/user/').then(response => {
      console.log('Get user response: ')
      console.log(response.data)
      if (response.data.user) {
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

  async getSchool () {
    await axios.get('/school/getSchool', { params: { username: this.state.username } }).then(response => {
      if (response.data.schoolName) {
        this.setState({
          school: { ...response.data }
        })
      } else {
        this.setState({
          school: {}
        })
      }
    })
  }

  render() {
    //
    return (
      <div className="App">
        <SiteNavbar {...this.state} updateUser={this.updateUser} />
        {/* Routes to different components */}
        <Route
          exact path="/home" 
          render={() =>
            <Home
              {...this.state}
            />}
        />
        <Route
          exact path="/" 
          render={() =>
            <SimpleMap
              {...this.state}
            />}
        />
        <Route
          exact path="/dashboard/school-signup"
          render={() =>
            <SchoolSignUp
              username={this.state.username} role={this.state.role}
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
          exact path="/dashboard/student-signup"
          render={() =>
            <div className='dashboard-content'>
              <Signup role='student' admin={this.state.username}
                signup={this.signup}
              />
            </div>}
        />
        <ProtectedRoute
          path='/dashboard'
          component={SideMenu}
          role={this.state.role}
        />
        <Route
          exact path="/dashboard"
          render={() => <Dashboard {...this.state} />}
        />
        <Route
          exact path="/dashboard/student-roster"
          render={() =>
            <StudentRoster role={this.state.role}
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
      <Footer/>
      </div>
    );
  }
}

export default App;