import React, { Component } from 'react';
import SimpleMap from '../map.js';

class DriverRoster extends Component {
  constructor() {
    super()
    this.state = {
      usersList: [{
        firstName: 'Jelly',
        lastName: 'Wang',
        email: 'Jelly.Wang@gmail.com',
        licensePlate: '1111111111',
        carModel: 'Tesla1'
      },
      {
        firstName: 'Kelly',
        lastName: 'Kang',
        email: 'Jelly.Jang@gmail.com',
        licensePlate: '2222222222',
        carModel: 'Tesla2'
      },
      {
        firstName: 'Lelly',
        lastName: 'Lang',
        email: 'Lelly.Lang@gmail.com',
        licensePlate: '3333333333',
        carModel: 'Tesla3'
      },
      {
        firstName: 'Delly',
        lastName: 'Dang',
        email: 'Delly.Dang@gmail.com',
        licensePlate: '4444444444',
        carModel: 'Tesla4'
      }]
    }
  }

  renderTableData() {
    var results = [];
    for (var i=0; i < this.state.usersList.length; i++){
      results.push(
      <tr>
        <td>{this.state.usersList[i].firstName}</td>
        <td>{this.state.usersList[i].lastName}</td>
        <td>{this.state.usersList[i].email}</td>
        <td>{this.state.usersList[i].licensePlate}</td>
        <td>{this.state.usersList[i].carModel}</td>
      </tr>
      )
    }

    /*
    var fN = this.state.usersList[:].firstName;
    var lN = this.state.usersList[:].lastName;
    var em = this.state.usersList[:].email;
    var pn = this.state.usersList[:].phoneNumber;
    */
    return results
  }
  render() {
    return (
       <div className="dashboard-content">
        <h1 id='title'>Driver Roster</h1>
        <table className='table'>    
        <thead className='thead-dark'>
          <tr>
          <th scope="col">First Name</th>
          <th scope="col">Last Name</th>
          <th scope="col">Email</th>
          <th scope="col">License Plate</th>
          <th scope="col">Car Model</th>
          </tr>
        </thead>               
        <tbody>
          {this.renderTableData()}
        </tbody>
        </table>
       </div>
    )
   }
}
export default DriverRoster;