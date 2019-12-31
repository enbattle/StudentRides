import React, { Component } from 'react'
import axios from 'axios'
import { storage } from '../../firebase-config'
import DefaultImg from '../../assets/images/default-profile.png'
import '../../assets/stylesheets/signup.css'
const stateList = require('../../assets/data/states.json') 

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
    this.displayFormInput = this.displayFormInput.bind(this)
    this.createStateOptions = this.createStateOptions.bind(this)
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

  createStateOptions () {
    const tifOptions = Object.keys(stateList).map(key => 
      <option value={stateList[key]}>{key}</option>
    )
    return tifOptions;
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
            {this.displayFormInput('address', 'Address', 'text', 'handleChange')}
            {this.displayFormInput('address', 'Address', 'text', 'handleChange')}
            {this.displayFormInput('city', 'City', 'text', 'handleChange')}
            <div className='form-group'>
              <div className='col col-ml-auto'>
                <label className='form-label' htmlFor='state'>State: </label>
              </div>
              <div className='col col-mr-auto'>
                <select className='form-control' id='state' name='state' value={this.state.state} onChange={this.handleChange}>
                  {this.createStateOptions()}
                </select>
              </div>
            </div>
            {this.displayFormInput('zipcode', 'Zipcode', 'Number', 'handleChange')}
            <div className="form-group">
              <label htmlFor="carImage">Car Image: </label>
              <input type="file" className="form-control" ref={this.carImage}  />
            </div>
            {this.displayFormInput('carName', 'Car Model Name', 'text', 'handleChange')}
            {this.displayFormInput('year', 'Year', 'Number', 'handleChange')}
            {this.displayFormInput('plate', 'License Plate #', 'text', 'handleChange')}
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
