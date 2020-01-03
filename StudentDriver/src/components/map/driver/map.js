import React, { Component } from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker, DirectionsRenderer } from 'react-google-maps'
import marker from '../../../assets/images/marker.png'
import socketIOClient from 'socket.io-client'
import { Button, Modal } from 'react-bootstrap'
// import withScriptjs from 'react-google-maps/lib/async/withScriptjs';
const SOCKET_URL = 'http://localhost:8000'
const styles = require('../../../assets/GoogleMapStyles.json')

const AsyncGoogleMap = withScriptjs(
  withGoogleMap(
    props => (
      <GoogleMap
        bootstrapURLKeys={{ key: 'AIzaSyBKJLqzyC96UuILQA79vjGUT11rkJrp65w' }}
        defaultCenter={{
          lat: 40.8,
          lng: -73
        }}
        defaultOptions={{
          disableDefaultUI: true, // disable default map UI
          draggable: true, // make map draggable
          keyboardShortcuts: false, // disable keyboard shortcuts
          scaleControl: true, // allow scale controle
          scrollwheel: true, // allow scroll wheel
          styles: styles // change default map styles
        }}
        defaultZoom={props.zoom}
      >
        {props.directions != null && <DirectionsRenderer directions={props.directions} />}
        <Marker
          position={{ lat: 40.8, lng: -73 }}
          icon={{
            url: marker,
            scaledSize: new window.google.maps.Size(40, 30)
          }}
          name='My Marker'
        />

        {props.requests.map((value, index) => {
          return (
            <Marker position={{ lat: value.lat, lng: value.lng }} name='Student Marker' key={index} />
          )
        })}

        {props.accepted.map((value, index)=>{
          return (
            <Marker position={{ lat: value.lat, lng: value.lng }} name='Student Marker' key={index} />
          )
        })}
      </GoogleMap>
    )
  )
)

const Popup = props => (
  <div>
    <Modal show={props.show} onHide={() => props.toggle()} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Ride Request</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img className='rider-image' src={props.request.student.profileImage} />
        <h5>{props.request.student.firstName} {props.request.student.lastName} needs a ride from ({props.request.lng}, {props.request.lat}) to school</h5>
      </Modal.Body>

      <Modal.Footer>
        <Button variant='secondary' onClick={() => props.toggle()}>
          Close
        </Button>
        <Button variant='primary' onClick={() => props.accept()}>
          Accept
        </Button>
      </Modal.Footer>
    </Modal>
  </div>
)

function escapeRegExp (str) {
  return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

class DriverMap extends Component {
  constructor () {
    super()
    this.state = {
      center: {
        lat: 0,
        lng: 0
      },
      showModal: false,
      driver: {driver: {}, car: {} },
      driverUser: {},
      destination: null,
      requests: [],
      accepted: [],
      socketID: '',
      directions: null,
      showAccept: false
    }
    this.toggleRejectReq = this.toggleRejectReq.bind(this)
    this.toggle = this.toggle.bind(this)
    this.accept = this.accept.bind(this)
    this.loadMap = this.loadMap.bind(this)
    this.getDirections = this.getDirections.bind(this)
  }

  componentDidMount () {
    // console.log(this.props);
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        center: {
          lng: position.coords.longitude,
          lat: position.coords.latitude
        },
        zoom: 10
      })
      // console.log(this.state.longitude);
    })
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.school.schoolName) {
      var endpoint = SOCKET_URL + '/' + replaceAll(nextProps.school['schoolName'], ' ', '')
      console.log(endpoint)
      var socket = socketIOClient.connect(endpoint)
      console.log(socket)
      this.setState({
        endpoint: endpoint,
        socket: socket
      }, () => {
        console.log(this.state.endpoint)
        this.state.socket.emit('getID');
        this.state.socket.on('socketID', (data) => {
          this.setState({
            socketID: data
          }, () => {
            console.log("this socketID =>", this.state.socketID);
          })
        })
        this.state.socket.on('FROM Student', (student, location, id) => {
          // console.log("location ==",location); 
          // console.log("id ==", id);
          var newRequest = this.state.requests
          var tempStore = location
          tempStore.socketID = id
          tempStore.student = student
          newRequest.push(tempStore)
          console.log(newRequest);
          this.setState({
            requests: newRequest
          }, () => {
            this.toggle()
          })
        })
      })
    }
    this.setState({ ...this.state, nextProps })
  }

  getDirections (origin, destination) {
    const directionsService = new window.google.maps.DirectionsService()
    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: window.google.maps.TravelMode.DRIVING
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result
          })
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    )
  }

  accept () { // for the driver to say he/she accepted
    const socket = socketIOClient(this.state.endpoint);
    // console.log("socket==",socket);
    var response = this.state.center
    response.socketID = this.state.socketID
    socket.emit('REQUEST ACK', this.props.username, this.state.requests[0].socketID, response);
    var requests = this.state.requests
    var acceptCall = requests.pop(0)
    this.setState({
      requests: requests
    })
    var accepted = this.state.accepted
    accepted.push(acceptCall)
    this.setState({
      accepted: accepted,
      destination: { lat: acceptCall.lat, lng: acceptCall.lng }
    }, () => {
      const origin = { lat: 40.8, lng: -73 }
      this.getDirections(origin, this.state.destination)
    })
  }

  toggleRejectReq () {
    var requests = this.state.requests
    requests.pop(0)
    this.setState({
      requests: requests
    })
    this.toggle()
  }

  toggle () {
    this.setState({
      showModal: !this.state.showModal
    }, () => {
      // console.log(this.state.showModal);
    })
  }

  loadMap () {
    return (
      <AsyncGoogleMap
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBKJLqzyC96UuILQA79vjGUT11rkJrp65w"
        loadingElement={<div style={{ height: `100vh` }} />}
        containerElement={<div style={{ height: `100vh` }} />}
        mapElement={<div style={{ height: `100vh` }} />}
        zoom={this.state.zoom} destination={this.state.destination} center={this.state.center} role={this.props.role} requests={this.state.requests} accepted={this.state.accepted} directions={this.state.directions} key="map"/>
    )
  }

  render () {
    return (
      // Important! Always set the container height explicitly
      <div>
        {this.loadMap()}
        {this.state.requests.length > 0 && <Popup show={this.state.showModal} request={this.state.requests[0]} toggle={this.toggleRejectReq} accept={this.accept}/>}
      </div>
    )
  }
}

export default DriverMap
