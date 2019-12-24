import React, { Component } from 'react';
import SimpleMap from './map.js';

class StudentRoster extends Component {
    constructor() {
        super()
        this.state = {
            usersList: [{
                firstName: 'Kristofer',
                lastName: 'Kwan',
                email: 'kristofer.kwan@gmail.com',
                phoneNumber: '1111111111'
            },
            {
                firstName: 'Cristofer',
                lastName: 'Cwan',
                email: 'cristofer.cwan@gmail.com',
                phoneNumber: '2222222222'
            },
            {
                firstName: 'Xristofer',
                lastName: 'Xwan',
                email: 'xristofer.xwan@gmail.com',
                phoneNumber: '3333333333'
            },
            {
                firstName: 'Yristofer',
                lastName: 'Ywan',
                email: 'yristofer.ywan@gmail.com',
                phoneNumber: '4444444444'
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
                <td>{this.state.usersList[i].phoneNumber}</td>
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
           <div class="dashboard-content">
              <h1 id='title'>Student Roster</h1>
              <table class="table">    
                <thead class="thead-dark">
                    <tr>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone Number</th>
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
export default StudentRoster;