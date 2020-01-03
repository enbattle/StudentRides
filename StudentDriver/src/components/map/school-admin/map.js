import React, { Component } from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker, DirectionsRenderer } from 'react-google-maps'
// import withScriptjs from 'react-google-maps/lib/async/withScriptjs';
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
        {props.students.map((value, index) => {
          return (
            <Marker position={{ lat: value.lat, lng: value.lng }} name='Student Marker' key={index} />
          )
        })}

        {props.drivers.map((value, index)=>{
          return (
            <Marker position={{ lat: value.lat, lng: value.lng }} name='Student Marker' key={index} />
          )
        })}
      </GoogleMap>
    )
  )
)

class SchoolAdminMap extends Component {
  constructor () {
    super()
    this.state = {
      center: {
        lat: 0,
        lng: 0
      }
    }

    this.loadMap = this.loadMap.bind(this)
  }

  componentDidMount () {
    // console.log(this.props);
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        center: {
          lng: position.coords.longitude,
          lat: position.coords.latitude
        },
        zoom: 10,
        students: [],
        drivers: []
      })
      // console.log(this.state.longitude);
    })
  }

  loadMap () {
    return (
      <AsyncGoogleMap
        googleMapURL='https://maps.googleapis.com/maps/api/js?key=AIzaSyBKJLqzyC96UuILQA79vjGUT11rkJrp65w'
        loadingElement={<div style={{ height: `100vh` }} />}
        containerElement={<div style={{ height: `100vh` }} />}
        mapElement={<div style={{ height: `100vh` }} />}
        {...this.state} key='map'/>
    )
  }

  render () {
    return (
      // Important! Always set the container height explicitly
      <div>
        {this.loadMap()}
      </div>
    )
  }
}

export default SchoolAdminMap
