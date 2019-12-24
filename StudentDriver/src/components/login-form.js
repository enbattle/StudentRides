import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import form from 'react-bootstrap/Form'
import '../assets/stylesheets/login.css'

class LoginForm extends Component {
  constructor () {
    super()
    this.state = {
      username: '',
      password: '',
      message: '',
      error: false,
      redirectTo: null
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit (event) {
    event.preventDefault()
    console.log('handleSubmit')
    axios.post('/user/login', {
      username: this.state.username,
      password: this.state.password
    }).then(response => {
      console.log('login response: ')
      console.log(response)
      if (response.status === 200) {
        // update App.js state
        console.log('response data:', response.data);
        this.props.updateUser({
          loggedIn: true,
          username: response.data.username,
          role: response.data.role
        })
        // update the state to redirect to home
        this.setState({
          redirectTo: '/'
        })
      }
    }).catch(error => {
      this.setState({
        error: true,
        message: "Username or Password Invalid"
      })
      console.log('login error: ')
      console.log(error)
    })
  }

  render () {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />
    } else {
      return (
        <div className="card col-md login">  
          <div className="card-body">
            <form>
              <h3>Login</h3>
              {this.state.error &&
                <div class="alert alert-danger" role="alert">
                  {this.state.message}
                </div> 
              }
              <div className="form-group">
                <label>Email address</label>
                <input type="email" name="username" value={this.state.username} onChange={this.handleChange} className="form-control" placeholder="Enter email" />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input type="password" name="password" className="form-control" placeholder="Enter password" value={this.state.password} onChange={this.handleChange} />
              </div>

              <div className="form-group">
                <div className="custom-control custom-checkbox">
                  <input type="checkbox" className="custom-control-input" id="customCheck1" />
                  <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                </div>
              </div>

              <button type="submit" onClick={this.handleSubmit} className="btn btn-primary btn-block">Submit</button>
              <p className="forgot-password text-right">
                Forgot <a href="#">password?</a>
              </p>
            </form>
          </div>
          {/* <h4>Login</h4>
          <form className="form-horizontal">
            <div className="form-group">
              <div className="col-ml-auto">
                <label className="form-label" htmlFor="username">Username</label>
              </div>
              <div className="col-mr-auto">
                <input className="form-input"
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Username"
                  value={this.state.username}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="col-ml-auto">
                <label className="form-label" htmlFor="password">Password: </label>
              </div>
              <div className="col-mr-auto">
                <input className="form-input"
                  placeholder="password"
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="form-group ">
              <div className="col-7"></div>
              <button
                className="btn btn-primary col-1 col-mr-auto"
                onClick={this.handleSubmit}
                type="submit">Login</button>
            </div>
          </form> */}
        </div>
      )
    }
  }
}

export default LoginForm
