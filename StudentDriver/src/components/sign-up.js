import React, { Component } from 'react'
import axios from 'axios'
import { storage } from '../firebase-config'
import DefaultImg from '../assets/images/default-profile.png'
import '../assets/stylesheets/signup.css'
import DriverSignup from './driver-signup';

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
      showDriverSignup: false
    }
    this.profileImage = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.uploadImage = this.uploadImage.bind(this)
    this.setDefaultImage = this.setDefaultImage.bind(this)
    this.registerUser = this.registerUser.bind(this)
    this.registerDriver = this.registerDriver.bind(this)
  }

  setDefaultImage (uploadType) {
    if (uploadType === "multer") {
      this.setState({
        multerImage: DefaultImg
      });
    } else if (uploadType === "firebase") {
      this.setState({
        firebaseImage: DefaultImg
      });
    } else {
      this.setState({
        baseImage: DefaultImg
      });
    }
  }

  async uploadImage (e, method) {
    let imageObj = {};
    console.log(e);
    if (method === "multer") {

      let imageFormObj = new FormData();

      imageFormObj.append("imageName", "multer-image-" + Date.now());
      imageFormObj.append("imageData", e.current.files[0]);

      // stores a readable instance of 
      // the image being uploaded using multer
      this.setState({
        multerImage: URL.createObjectURL(e.current.files[0])
      });

      await axios.post(`${API_URL}/image/uploadmulter`, imageFormObj)
        .then((data) => {
          if (data.data.success) {
            alert("Image has been successfully uploaded using multer");
            this.setDefaultImage("multer");
          }
        })
        .catch((err) => {
          alert("Error while uploading image using multer");
          this.setDefaultImage("multer");
        });
    } else if (method === "firebase") {
      let currentImageName = "firebase-image-" + Date.now();
      console.log("storage: ", storage);
      let uploadImage = storage.ref(`images/${currentImageName}`).put(e.current.files[0]);
      return new Promise(resolve => {uploadImage.on('state_changed',
        async (snapshot) => { },
        async (error) => {
          alert(error);
        },
        async () => {
          var url = await storage.ref('images').child(currentImageName).getDownloadURL().then(async (url) => {
            this.setState({
              firebaseImage: url
            });

            // store image object in the database
            imageObj = {
              imageName: currentImageName,
              imageData: url
            };
            await axios.post(`${API_URL}/image/uploadbase`, imageObj)
              .then((data) => {
                if (data.data.success) {
                  alert("Image has been successfully uploaded using firebase storage");
                  this.setDefaultImage("firebase");
                }
              })
              .catch((err) => {
                alert("Error while uploading image using firebase storage")
                this.setDefaultImage("firebase");
            });
            resolve(url);
          })
        })
      })
    }
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
    if (this.props.role === 'school-admin' || (this.props.role === 'driver' && this.state.showDriverSignup)) {
      this.registerUser().then(res => {
        if (this.props.role === 'driver') {
          this.registerDriver(data, res)
        } else{
          window.location = "/dashboard"
        }
      })
    //request to server to add a new username/password
    } else {
      this.setState({
        showDriverSignup: true
      })
    }
  }

  render () {
    return (
      <>
        {true &&
        <div className="card col-md signup">
          <div className="card-body">
            <form onSubmit={(e) => this.handleSubmit(e, null)}>
              <h3>Sign up</h3>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input className="form-control"
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Email"
                  value={this.state.username}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password: </label>   
                <input className="form-control"
                  placeholder="password"
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="firstName">First Name: </label>          
                <input className="form-control"
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="First Name"
                  value={this.state.firstName}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name: </label>
                <input className="form-control"
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Last Name"
                  value={this.state.lastName}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="profileImage">Profile Image: </label>
                <input type="file" className="form-control" ref={this.profileImage}  />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Email: </label>
                <input className="form-control"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number: </label>
                <input className="form-control"
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  value={this.state.phoneNumber}
                  onChange={this.handleChange}
                />
              </div>
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
      </>
    )
  }
}

export default Signup