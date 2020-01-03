import React, { Component } from 'react'
import '../assets/stylesheets/Marker.css'
import '../assets/stylesheets/map.css'
import DriverMap from '../components/map/driver/map'
import StudentMap from '../components/map/student/map'
import SchoolAdminMap from '../components/map/school-admin/map'

// import withScriptjs from 'react-google-maps/lib/async/withScriptjs';

class SimpleMap extends Component {
  constructor () {
    super()
    this.state = {}
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

  static getDerivedStateFromProps (nextProps, prevState) {
    console.log(nextProps)
    console.log(prevState)
    if (nextProps !== prevState) {
      return { ...nextProps }
    } else {
      return null
    }
  }

  render () {
    return (
      // Important! Always set the container height explicitly
      <>
        {this.props.role === 'driver' && <DriverMap {...this.state} />}
        {this.props.role === 'student' && <StudentMap {...this.state} />}
        {this.props.role === 'school-admin' && <SchoolAdminMap {...this.state} />}
      </>
    )
  }
}

export default SimpleMap
