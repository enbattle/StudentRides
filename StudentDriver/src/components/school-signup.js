import React, { Component } from 'react'
import axios from 'axios'

class SchoolSignUp extends Component {
  constructor() {
    super()

    this.state = {
      schoolName: '',
      password: '',
      address: '',
      city: '',
      state: '',
      zipcode: '',
      latitude: '',
      longitude: '',
      phoneNumber: '',
      stateList:  {
        'Alabama': 'AL',
        'Alaska': 'AK',
        'American Samoa': 'AS',
        'Arizona': 'AZ',
        'Arkansas': 'AR',
        'California': 'CA',
        'Colorado': 'CO',
        'Connecticut': 'CT',
        'Delaware': 'DE',
        'District Of Columbia': 'DC',
        'Federated States Of Micronesia': 'FM',
        'Florida': 'FL',
        'Georgia': 'GA',
        'Guam': 'GU',
        'Hawaii': 'HI',
        'Idaho': 'ID',
        'Illinois': 'IL',
        'Indiana': 'IN',
        'Iowa': 'IA',
        'Kansas': 'KS',
        'Kentucky': 'KY',
        'Louisiana': 'LA',
        'Maine': 'ME',
        'Marshall Islands': 'MH',
        'Maryland': 'MD',
        'Massachusetts': 'MA',
        'Michigan': 'MI',
        'Minnesota': 'MN',
        'Mississippi': 'MS',
        'Missouri': 'MO',
        'Montana': 'MT',
        'Nebraska': 'NE',
        'Nevada': 'NV',
        'New Hampshire': 'NH',
        'New Jersey': 'NJ',
        'New Mexico': 'NM',
        'New York': 'NY',
        'North Carolina': 'NC',
        'North Dakota': 'ND',
        'Northern Mariana Islands': 'MP',
        'Ohio': 'OH',
        'Oklahoma': 'OK',
        'Oregon': 'OR',
        'Palau': 'PW',
        'Pennsylvania': 'PA',
        'Puerto Rico': 'PR',
        'Rhode Island': 'RI',
        'South Carolina': 'SC',
        'South Dakota': 'SD',
        'Tennessee': 'TN',
        'Texas': 'TX',
        'Utah': 'UT',
        'Vermont': 'VT',
        'Virgin Islands': 'VI',
        'Virginia': 'VA',
        'Washington': 'WA',
        'West Virginia': 'WV',
        'Wisconsin': 'WI',
        'Wyoming': 'WY'
        }
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.createStateOptions = this.createStateOptions.bind(this);
  }
  createStateOptions(){
    const tifOptions = Object.keys(this.state.stateList).map(key => 
      <option value={this.state.stateList[key]}>{key}</option>
    )
    return tifOptions;
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSubmit(event) {
    console.log('sign-up handleSubmit, school: ')
    console.log(this.state.schoolName)
    event.preventDefault()

    //request to server to add a new username/password
    axios.post('/school/', {
      schoolName: this.state.schoolName,
      password: this.state.password,
      address: this.state.address,
      latitude: 33.8795,
      longitude:-117.8928,
      phoneNumber: this.state.phoneNumber,
    })
      .then(response => {
        console.log(response)
        if (!response.data.errmsg) {
          console.log('successful signup')
          // this.setState({ //redirect to login page
          // 	redirectTo: '/login'
          // })
          //window.location = "/schoolLogin"
        } else {
          console.log('schoolName already taken')
        }
      }).catch(error => {
        console.log('signup error: ')
        console.log(error)

      })
  }


render() {
  return (
    <div className="SignupForm">
      <h4>School Sign up</h4>
      <form className="form-horizontal">
        <div className="form-group">
          <div className="col-1 col-ml-auto">
            <label className="form-label" htmlFor="schoolName">School Name</label>
          </div>
          <div className="col-3 col-mr-auto">
            <input className="form-input"
              type="text"
              id="schoolName"
              name="schoolName"
              placeholder="School Name"
              value={this.state.schoolName}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="form-group">
          <div className="col-1 col-ml-auto">
            <label className="form-label" htmlFor="password">Password: </label>
          </div>
          <div className="col-3 col-mr-auto">
            <input className="form-input"
              placeholder="password"
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="form-group">
          <div className="col-1 col-ml-auto">
            <label className="form-label" htmlFor="address">Address: </label>
          </div>
          <div className="col-3 col-mr-auto">
            <input className="form-input"
              type="text"
              id="address"
              name="address"
              placeholder="Address"
              value={this.state.address}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="form-group">
          <div className="col-1 col-ml-auto">
            <label className="form-label" htmlFor="city">City: </label>
          </div>
          <div className="col-3 col-mr-auto">
            <input className="form-input"
              type="text"
              id="city"
              name="city"
              placeholder="City"
              value={this.state.city}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="form-group">
          <div className="col-1 col-ml-auto">
            <label className="form-label" htmlFor="state">State: </label>
          </div>
          <div className="col-3 col-mr-auto">
          <select id="state" name="state" value={this.state.state} onChange={this.handleChange}>
            {this.createStateOptions()}
          </select>
          </div>
        </div>
        <div className="form-group">
          <div className="col-1 col-ml-auto">
            <label className="form-label" htmlFor="zipcode">Zipcode: </label>
          </div>
          <div className="col-3 col-mr-auto">
            <input className="form-input"
              type="text"
              id="zipcode"
              name="zipcode"
              placeholder="Zipcode"
              value={this.state.zipcode}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="form-group">
          <div className="col-1 col-ml-auto">
            <label className="form-label" htmlFor="phoneNumber">Phone Number: </label>
          </div>
          <div className="col-3 col-mr-auto">
            <input className="form-input"
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Phone Number"
              value={this.state.phoneNumber}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="form-group ">
          <div className="col-7"></div>
          <button
            className="btn btn-primary col-1 col-mr-auto"
            onClick={this.handleSubmit}
            type="submit"
          >Sign up</button>
        </div>
      </form>
    </div>

  )
}
}

export default SchoolSignUp