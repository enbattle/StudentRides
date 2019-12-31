import React, { Component } from 'react'
import axios from 'axios'
const stateList = require('../../assets/data/states.json')

class SchoolSignUp extends Component {
  constructor() {
    super()

    this.state = {
      schoolName: '',
      address: '',
      city: '',
      state: '',
      zipcode: '',
      email: '',
      phoneNumber: '',
      schoolAdminTemp: '',
      studentsTemp: '',
      driversTemp: '',
      schoolAdmin: [],
      students: [],
      drivers: []
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.displayFormInput = this.displayFormInput.bind(this);
    this.handleUsers = this.handleUsers.bind(this);
    this.displayList = this.displayList.bind(this);
    this.createStateOptions = this.createStateOptions.bind(this);
    this.deleteItem = this.deleteItem.bind(this);  
  }

  createStateOptions () {
    const tifOptions = Object.keys(stateList).map(key => 
      <option value={stateList[key]}>{key}</option>
    )
    return tifOptions;
  }

  handleChange(event) {
    //console.log(event.target);
    this.setState({
      [event.target.name]: event.target.value
    })
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

  deleteItem (name, index) {
    var temp = this.state[name];
    temp.splice(index, 1);
    this.setState({
      [name]: temp
    })
  }

  displayList (name) {
    if (this.state[name].length > 0) {
      var list = this.state[name].map((item, key) => {
        return (
          <tr>
            <th className='col-10'>
              { item }
            </th>
            <th className='col-2'>
              <i className="fas fa-minus-square" onClick={() => this.deleteItem(name, key)}></i>
            </th>
          </tr>
        )
      })
      return (
        <table className='table'>
          <thead className='thead-dark'>
            <tr>
              <th scope='col-10'>Users</th>
              <th scope='col-2' />
            </tr>
          </thead>
          <tbody>
            {list}
          </tbody>
        </table>
      )
    }
  }

  handleUsers (name) {
    var temp = this.state[name]
    console.log(name);
    temp.push(this.state[name + 'Temp'])

    this.setState({
      [name]: temp,
      [name + 'Temp']: ''
    })
  }

  handleSubmit (event) {
    console.log('sign-up handleSubmit, school: ')
    console.log(this.state.schoolName)
    event.preventDefault()

    //request to server to add a new username/password
    axios.post('/school/', { ...this.state, username: this.props.username, role: this.props.role })
      .then(response => {
        console.log(response)
        if (!response.data.errmsg) {
          alert('school created correctly!')
          // this.setState({ //redirect to login page
          // 	redirectTo: '/login'
          // })
          //window.location = '/schoolLogin'
        } else {
          console.log(response.data.errmsg)
        }
      }).catch(error => {
        console.log('signup error: ')
        console.log(error)
      })
  }

  render () {
    return (
      <div className='dashboard-content'>
        <div className='signup'>
          <h4>School Sign up</h4>
          <form className='form-horizontal' onSubmit={this.handleSubmit}>
            {this.displayFormInput('schoolName', 'School Name', 'text', 'handleChange')}
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
            {this.displayFormInput('phoneNumber', 'Phone Number', 'text', 'handleChange')}
            {this.displayFormInput('email', 'Email', 'email', 'handleChange')}
            {this.displayFormInput('schoolAdmin', 'School Admin (Enter Username)', 'list', 'handleUsers')}
            {this.displayList('schoolAdmin')}
            {this.displayFormInput('students', 'Students (Enter Username)', 'list', 'handleUsers')}
            {this.displayList('students')}
            {this.displayFormInput('drivers', 'Drivers (Enter Username)', 'list', 'handleUsers')}
            {this.displayList('drivers')}
            <div className='form-group '>
              <button
                className='btn btn-primary col-mr-auto'
                type='submit'
              >Sign up</button>
            </div>
          </form> 
        </div>
      </div>
    )
  }
}

export default SchoolSignUp