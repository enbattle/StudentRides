import React, { Component } from 'react'
import axios from 'axios'
import { storage } from '../../firebase-config'
import DefaultImg from '../../assets/images/default-profile.png'
import '../../assets/stylesheets/signup.css'
import DriverSignup from './driver-signup'
import StudentSignup from './student-signup'
import {uploadImage} from '../../assets/scripts/image'

const API_URL = 'http://localhost:8080';

const Buttons = props => (
  <div>
    <div className="btn btn-primary" onClick={(e) => props.setRole(e, "Driver")}>Add Drivers</div>
    <div className="btn btn-primary" onClick={(e) => props.setRole(e, "Student")}>Add Students</div>
    <div className="btn btn-primary" onClick={(e) => props.setRole(e, "Student")}>Delete Drivers</div>
    <div className="btn btn-primary" onClick={(e) => props.setRole(e, "Student")}>Delete Students</div>
  </div>
)

class Signup extends Component {
  constructor() {
    super()
    
    this.setRole = this.setRole.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.state = {
      username: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      firebaseImage: DefaultImg,
      roles: '',
      showForm: false,
      showDriverSignup: false,
      showStudentSignup: false
    }
    this.profileImage = React.createRef();
    this.displayFormInput = this.displayFormInput.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.uploadImage = uploadImage.bind(this)
    this.registerUser = this.registerUser.bind(this)
    this.registerDriver = this.registerDriver.bind(this)
    this.registerSchoolAdmin = this.registerSchoolAdmin.bind(this)
    this.registerStudent = this.registerStudent.bind(this)
  }

  toggleForm () {
    this.setState({
      showForm: !this.state.showForm
    })
  }

  setRole (e, role) {
    this.setState({
      roles: role
    });
    this.toggleForm();
  }

  handleChange (event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  registerStudent (data, username) {
    if (username) {
      data.username = username
      data.admin = this.props.admin
      axios.post('/user/student/', data).then(res => {
        alert("added the student!");
        window.location = "/login"
      }).catch(err => {
        alert("a critical error has occurred...", err);
      })
    }
  }

  registerSchoolAdmin (data, username) {
    if (username) {
      data.username = username
      axios.post('/user/school-admin/', data).then(res => {
        alert("added the school admin!");
        window.location = "/login"
      }).catch(err => {
        alert("a critical error has occurred...", err);
      })
    }
  }

  registerDriver (data, username) {
    if (username) {
      data.username = username
      this.uploadImage(data.image, "firebase").then(url => {
        data.image = url;
        axios.post('/user/driver/', data).then(res => {
          alert("added the driver!");
          window.location = "/dashboard"
        }).catch(err => {
          alert("a critical error has occurred...", err);
        })
      })
    }
  }

  displayFormInput (name, formatName, valuetype, method) { 
    if (valuetype === 'list') {
      return (
        <div className='form-group'>
          <div className='col'>
            <label className='form-label' htmlFor={name}>{formatName}: </label>
          </div>
          <div class='row justify-content-center align-items-center'>
            <div className='form-group col-11'>
              <input className='form-control'
                type='text'
                id={name}
                name={name + 'Temp'}
                placeholder={formatName}
                value={this.state[name + 'Temp']}
                onChange={(e) => this.handleChange(e)}
              />
            </div>
            <div className='form-group col-1'>
              <div className="btn btn-primary" name={name} onClick={() => this.handleUsers(name)}><i class="fas fa-plus"></i></div>
            </div>
          </div>
        </div>    
      )
    }
    return (
      <div className='form-group'>
        <div className='col col-ml-auto'>
          <label className='form-label' htmlFor={name}>{formatName}: </label>
        </div>
        <div className='col col-mr-auto'>
          <input className='form-control'
            type={valuetype}
            id={name}
            name={name}
            placeholder={formatName}
            value={this.state[name]}
            onChange={(e) => this[method](e)}
          />
        </div>
      </div>
    )
  }

  async registerUser () {
    return new Promise(resolve => {
      this.uploadImage(this.profileImage, "firebase").then(url => {
        console.log(url)
        axios.post('/user/', {
          username: this.state.username,
          password: this.state.password,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          profileImage: url,
          email: this.state.email,
          phoneNumber: this.state.phoneNumber,
          roles: this.props.role
        })
          .then(response => {
            console.log(response)
            if (!response.data.errmsg) {
              console.log('successful signup')
              resolve(response.data.username)
              
              // this.setState({ //redirect to login page
              // 	redirectTo: '/login'
              // })
            } else {
              console.log(response.data.errmsg);
            }
          }).catch(error => {
            console.log('signup error: ')
            console.log(error)
            resolve(null)
          })
      })
    })
  }

  async handleSubmit (event, data) {
    event.preventDefault()
    console.log(event);
    console.log('data == ', data);
    if (this.props.role === 'school-admin' || (this.props.role === 'driver' && this.state.showDriverSignup) ||
       (this.props.role === 'student' && this.state.showStudentSignup)) {
      this.registerUser().then(res => {
        if (this.props.role === 'driver') {
          this.registerDriver(data, res)
        } else if (this.props.role === 'school-admin') {
          this.registerSchoolAdmin(data, res)
        } else if (this.props.role === 'student') {
          this.registerStudent(data, res)
        }
      })
    //request to server to add a new username/password
    } else if (this.props.role === 'driver') {
      this.setState({
        showDriverSignup: true
      })
    } else if (this.props.role === 'student') {
      this.setState({
        showStudentSignup: true
      }) 
    }
  }

  render () {
    return (
      <>
        {true &&
        <div className="card col-md signup">
          <div className="card-body">
            <form onSubmit={(e) => this.handleSubmit(e, { ...this.state })}>
              <h3>Sign up</h3>
              {this.displayFormInput('username', 'Username', 'text', 'handleChange')}
              {this.displayFormInput('password', 'Password', 'password', 'handleChange')}
              {this.displayFormInput('firstName', 'First Name', 'text', 'handleChange')}
              {this.displayFormInput('lastName', 'Last Name', 'text', 'handleChange')}
              <div className="form-group">
                <label htmlFor="profileImage">Profile Image: </label>
                <input type="file" className="form-control" ref={this.profileImage}  />
              </div>
              {this.displayFormInput('email', 'Email', 'email', 'handleChange')}
              {this.displayFormInput('phoneNumber', 'Phone Number', 'text', 'handleChange')}
              <button type="submit" className="btn btn-primary btn-block">Sign up</button>
              <p className="already-signed-in text-right">
                Already signed in? <a href="#">Login Here</a>
              </p>
            </form>
          </div>
        </div>}
        {this.props.role === 'driver' && this.state.showDriverSignup &&
          <DriverSignup handleSubmit={(e, data) => this.handleSubmit(e, data)} />
        }
        {this.props.role === 'student' && this.state.showStudentSignup &&
          <StudentSignup handleSubmit={(e, data) => this.handleSubmit(e, data)} />
        }
      </>
    )
  }
}

export default Signup