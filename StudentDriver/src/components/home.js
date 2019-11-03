import React, { Component } from 'react';
import SimpleMap from './map.js';


class Home extends Component {
    constructor() {
        super()
    }


    render() {
        const imageStyle = {
            width: 400

        };
        return (
            <div>
               
                <SimpleMap/>
            </div>
        )
    }
}
export default Home;