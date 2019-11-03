import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import marker from "./marker_tim.PNG";


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
			longitude: 0,
      latitude: 0
    }
	}
  
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 1
  };
  
  componentDidMount(){
   navigator.geolocation.getCurrentPosition( (position) => {
     //console.log(position);
     this.setState({
      longitude: position.coords.longitude,
      latitude: position.coords.latitude
     });
     console.log(this.state.longitude);
   }) 
  }
  onChange(){

  }

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyDYhxcltk36Kyg6aFUfdxSqPXVmXW8RX3w" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={this.state.latitude}
            lng={this.state.longitude}

            text= "My Marker"
          />
        </GoogleMapReact>
      </div>
    );
  }
}
 
export default SimpleMap;