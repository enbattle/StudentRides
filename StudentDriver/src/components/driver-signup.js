import React, { Component } from 'react'
import axios from 'axios'
import { storage } from '../firebase-config'
import DefaultImg from '../assets/images/default-profile.png'
import '../assets/stylesheets/signup.css'

const API_URL = 'http://localhost:8080';

class DriverSignup extends Component {
  constructor() {
    super()
    this.state = {
      address: '',
      city: '',
      state: '',
      zipcode: '',
      plate: '',
      carName: '',
      year: 0,
      firebaseImage: DefaultImg
    }
    this.carImage = React.createRef();
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render () {
    return (
      <div className="card col-md signup">
        <div className="card-body">
          <form onSubmit={(e) => this.props.handleSubmit(e, { ...this.state, image: this.carImage })}>
            <h3>Driver Registration</h3>
            <div className="form-group">
              <label htmlFor="address">Address: </label>
              <input className="form-control"
                type="text"
                id="address"
                name="address"
                placeholder="Address"
                value={this.state.address}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="city">City: </label>   
              <input className="form-control"
                placeholder=" City"
                type="city"
                name="city"
                value={this.state.city}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="state">State: </label>          
              <input className="form-control"
                type="text"
                id="state"
                name="state"
                placeholder="State"
                value={this.state.state}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="zipcode">Zipcode: </label>
              <input className="form-control"
                type="Number"
                id="zipcode"
                name="zipcode"
                placeholder="Zip Code"
                value={this.state.zipcode}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="carImage">Car Image: </label>
              <input type="file" className="form-control" ref={this.carImage}  />
            </div>
            <div className="form-group">
              <label htmlFor="carName">Car Model Name: </label>
              <input className="form-control"
                type="text"
                id="carName"
                name="carName"
                placeholder="Car Model"
                value={this.state.carName}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="year">Year: </label>
              <input className="form-control"
                type="Number"
                id="year"
                name="year"
                placeholder="2000"
                value={this.state.year}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="plate">License Plate #: </label>
              <input className="form-control"
                type="text"
                id="plate"
                name="plate"
                placeholder="XXXXXXX"
                value={this.state.plate}
                onChange={this.handleChange}
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block">Finish Registration</button>
            <p className="already-signed-in text-right">
              Already signed in? <a href="#">Login Here</a>
            </p>
          </form>
        </div>
      </div>

    )
  }
}

export default DriverSignup
