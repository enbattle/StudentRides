import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import marker from "./marker_tim.PNG";
import '../assets/stylesheets/Marker.css';
import socketIOClient from "socket.io-client";
import {Button, Modal} from 'react-bootstrap';
import axios from 'axios';


const Popup = props => ( 
  <div>
  <Modal show={props.show} onHide={props.toggle} animation={false}>
    <Modal.Header closeButton>
      <Modal.Title>Ride Request</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <h5>Student needs a Ride Request from ({props.location.lng}, {props.location.lat})</h5>
    </Modal.Body>

    <Modal.Footer>
      <Button variant="secondary" onClick={props.toggle}>
        Close
      </Button>
      <Button variant="primary" onClick={props.accept}>
        Accept
      </Button>
    </Modal.Footer>
  </Modal>
  </div>
)

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
      showModal: false,
      requests: []
    }
    this.emitRequest = this.emitRequest.bind(this);
    this.toggle = this.toggle.bind(this);
    this.accept = this.accept.bind(this);
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
    const socket = socketIOClient(this.state.endpoint);
    if(nextProps.role == "student"){
      console.log("student send!");
    }
    else if(nextProps.role == "driver"){
      console.log("received request!\n");
      socket.on("FROM Student", data => {
        console.log(data);
        var newRequest = this.state.requests;
        newRequest.push(data);
        console.log(newRequest);
        this.setState({
          requests: newRequest
        }, () => {
          this.toggle();
        });
        
      });
    }
  }

  accept(){
    const socket = socketIOClient(this.state.endpoint);
    socket.emit("Accept", this.state.center);
    alert("pending accept request!")
  }


  toggle(){
    this.setState({
      showModal: !this.state.showModal
    }, () => {
      console.log(this.state.showModal);
    })

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
      <div>
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyDYhxcltk36Kyg6aFUfdxSqPXVmXW8RX3w" }}
          defaultCenter={{
            lat: 42,
            lng: -76
          }}

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
      {this.state.requests.length > 0 && <Popup show={this.state.showModal} location={this.state.requests[0]} toggle={this.toggle} accept={this.accept}/>}
      
      </div>
    );
  }
}
 
export default SimpleMap;