import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import marker from "./marker_tim.PNG";
import '../assets/stylesheets/Marker.css';
import socketIOClient from "socket.io-client";
import axios from 'axios';

const Marker = (props: any) => {
  const { color, name, id } = props;
  return (
    <div className="marker"
      style={{ backgroundColor: color, cursor: 'pointer'}}
      title={name}
    />
  );
};

const AnyReactComponent = ({ text }) => <div> <img src={marker} height={20} width={16}/> { text } </div>;

class SimpleMap extends Component {
  constructor() {
		super()
		this.state = {
      center: {
        lat: 0,
        lng: 0
      },
      endpoint: "http://127.0.0.1:8080",
      requests: []
    }
    this.emitRequest = this.emitRequest.bind(this);
	}

  
  componentDidMount(){
   console.log(this.props);
   navigator.geolocation.getCurrentPosition( (position) => {
     //console.log(position);
     
     this.setState({
       center: {
        lng: position.coords.longitude,
        lat: position.coords.latitude
       },
       zoom: 6
     });
     console.log(this.state.longitude);
   })
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.role == "driver"){
      const socket = socketIOClient(this.state.endpoint);
      console.log("received request!\n");
      socket.on("FROM Student", data => {
        console.log(data);
        var newRequest = this.state.requests;
        newRequest.push(data);
        console.log(newRequest);
        this.setState({
          requests: newRequest
        });
      });
    }
  }

  emitRequest() {
    axios.get('/request', {
      params: {
        location: this.state.center 
      }
    }).then( (err, res) => {
      console.log("sent a request!\n");
    });
  }

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyDYhxcltk36Kyg6aFUfdxSqPXVmXW8RX3w" }}
          defaultCenter={this.state.center}
          defaultZoom={this.state.zoom}
        > 
        {this.props.role == "driver" && 
        <Marker
            lat={42}
            lng={-76}
            color= "blue"
            name= "My Marker"
          />
        }
        {this.props.role == "student" && 
        <Marker
            lat={this.state.center.lat}
            lng={this.state.center.lng}
            color= "blue"
            name= "My Marker"
          />
        }

          {this.state.requests.map((value, index)=>{
            return <Marker lat={value.lat} lng={value.lng}
                    color= "red"
                    name= "Student Marker"
                  />
            
          })}
        </GoogleMapReact>
        {this.props.role == "student" && <button className ="btn btn-primary" onClick = {this.emitRequest}>Make Request</button>}
        
      </div>
    );
  }
}
 
export default SimpleMap;