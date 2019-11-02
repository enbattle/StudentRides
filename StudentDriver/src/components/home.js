import React, { Component } from 'react'
import SimpleMap from './map.js';


class Home extends Component {
    constructor() {
        super()
    }


    render() {
        const imageStyle = {
            width: 400

        }
        return (
            <div>
                <p>Welcome to Student Rides</p>
                <SimpleMap/>
                <img style={imageStyle} src="https://cdn.vox-cdn.com/thumbor/cUQ7ihWT6k95PM_vaM2WaubfWkc=/0x8:640x435/1200x800/filters:focal(0x8:640x435)/cdn.vox-cdn.com/uploads/chorus_image/image/50203181/new-google-maps1.0.0.png" />
            </div>
        )
    }
}
export default Home