import React, { Component } from 'react';
import {withScriptjs, withGoogleMap, GoogleMap, Marker, DirectionsRenderer } from 'react-google-maps';
import marker from "./marker_tim.PNG";
import '../assets/stylesheets/Marker.css';
import socketIOClient from "socket.io-client";
import {Button, Modal} from 'react-bootstrap';
//import withScriptjs from 'react-google-maps/lib/async/withScriptjs';
import axios from 'axios';
const socket = socketIOClient.connect('http://localhost:8080');

const AsyncGoogleMap = withScriptjs(
  withGoogleMap(
    props => (
      <GoogleMap
      bootstrapURLKeys={{ key: "AIzaSyDYhxcltk36Kyg6aFUfdxSqPXVmXW8RX3w" }}
      defaultCenter={{
        lat: 42,
        lng: -76
      }}

      defaultZoom={props.zoom}
    > 
    {props.destination != null && <DirectionsRenderer origin={props.center} destination={props.destination} />}
    {props.role == "driver" && 
    <Marker
        position={{lat: 42, lng: -76}}
        color= "blue"
        name= "My Marker"
      />
    }
    {props.role == "student" && 
    <Marker
        position={{lat: props.center.lat, lng: props.center.lng}}
        color= "blue"
        name= "My Marker"
      />
    }


      {props.requests.map((value, index)=>{
        return <Marker position= {{lat: value.lat, lng:value.lng}}
                color= "red"
                name= "Student Marker"
              />
        
      })}

      {props.accepted.map((value, index)=>{
        return <Marker position= {{lat: value.lat, lng:value.lng}}
                color= "green"
                name= "Student Marker"
              />
        
      })}
    </GoogleMap>
    )
  )
)

const DriverAccept = props => (
  <div>
  <Modal show={props.show} onHide={props.toggle} animation={false}>
  <Modal.Header closeButton>
    <Modal.Title>Accepted</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <h5>You're request has been accepted by John</h5>
  </Modal.Body>

  <Modal.Footer>
    <Button variant="secondary" onClick={props.toggle}>
      Close
    </Button>
  </Modal.Footer>
</Modal>
</div>
)

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
      driverID: '',
      destination: null,
      requests: [],
      accepted: [],
      socketID: '',
      showAccept: false
    }
    this.emitRequest = this.emitRequest.bind(this);
    this.toggleRejectReq = this.toggleRejectReq.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleAccept = this.toggleAccept.bind(this);
    this.accept = this.accept.bind(this);
    this.loadMap = this.loadMap.bind(this);
	}


  componentDidMount(){
   //console.log(this.props);

   navigator.geolocation.getCurrentPosition( (position) => {
     //console.log(position);
     
     this.setState({
       center: {
        lng: position.coords.longitude,
        lat: position.coords.latitude
       },
       zoom: 6
     });
     //console.log(this.state.longitude);
   })
  
  }
  componentWillReceiveProps(nextProps){
    const socket = socketIOClient(this.state.endpoint);
    socket.on("socketID", data => {
      this.setState({
        socketID: data      
      }, ()=> {
        //console.log("this socketID =>", this.state.socketID);
      }); 

    });

    if(nextProps.role == "student"){
      //console.log("listening for the accept call");
      socket.on("ACCEPT", data => {
        //console.log("driver accept", data);
        this.setState({
          driverID: data.socketID,
          destination: {lat: data.lat, lng: data.lng}
        }, () => {
          this.toggleAccept();
        });
      })
    }
    else if(nextProps.role == "driver"){
      //console.log("received request!\n");
      socket.on("FROM Student", (location, id) => {
        //console.log("location ==",location);
        //console.log("id ==", id);
        var newRequest = this.state.requests;
        var temp_store = location;
        temp_store['socketID'] = id
        newRequest.push(temp_store);
        //console.log(newRequest);
        this.setState({
          requests: newRequest
        }, () => {
          this.toggle();
        });
        
      });
    }
    this.setState({...this.state,nextProps})
  }

  accept(){ // for the driver to say he/she accepted
    const socket = socketIOClient(this.state.endpoint);
    //console.log("socket==",socket);
    var response = this.state.center;
    response['socketID'] = this.state.socketID;
    socket.emit('acceptCalls', this.state.requests[0].socketID, response);
    var requests = this.state.requests;
    var accept_call = requests.pop(0);
    this.setState({
      requests: requests
    });
    var accepted = this.state.accepted;
    accepted.push(accept_call);
    this.setState({
      accepted: accepted,
      destination: {lat:accept_call.lat, lng:accept_call.lng}
    }) 
  }

  toggleRejectReq(){
    var requests = this.state.requests;
    requests.pop(0);
    this.setState({
      requests: requests
    });
    this.toggle();
  }

  toggle(){
    this.setState({
      showModal: !this.state.showModal
    }, () => {
      //console.log(this.state.showModal);
    })

  }
  toggleAccept(){
    this.setState({
      showAccept: !this.state.showAccept
    });
  }

  emitRequest() {
    //console.log(this.state.socketID);
    const result = {
      location: this.state.center,
      socketID: this.state.socketID
    }
    axios.get('/request', {
      params: {
        result: JSON.stringify({ location: this.state.center, socketID: this.state.socketID }) 
      }
    }).then( (err, res) => {
      //console.log("sent a request!\n");
    });
  }
  loadMap(){
    return(
      <AsyncGoogleMap 
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDYhxcltk36Kyg6aFUfdxSqPXVmXW8RX3w"
loadingElement={<div style={{ height: `100vh` }} />}
containerElement={<div style={{ height: `100vh` }} />}
mapElement={<div style={{ height: `100vh` }} />}
    zoom={this.state.zoom} destination={this.state.destination} center={this.state.center} role={this.props.role} requests={this.state.requests} accepted={this.state.accepted} key="map"></AsyncGoogleMap>
    )
  }

  render() {
    return (
      // Important! Always set the container height explicitly
      <div>
      {this.loadMap()}
      {this.props.role == "student" && <button className ="btn btn-primary" onClick = {this.emitRequest}>Make Request</button>}
      {this.state.requests.length > 0 && <Popup show={this.state.showModal} location={this.state.requests[0]} toggle={this.toggleRejectReq} accept={this.accept}/>}
      <DriverAccept show={this.state.showAccept}  toggle={this.toggleAccept} />
      </div>
    );
  }
}
 
export default SimpleMap;