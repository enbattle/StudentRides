import React, { Component } from 'react';
import SimpleMap from './map.js';

class Home extends Component {
    constructor() {
        super()
        this.state = {
            role: null,
        }
    }
    
    componentDidMount(){
        this.setState({
            role: this.props.role
        })
    }

    render() {
        const imageStyle = {
            width: 400

        };
        return (
            <div>
               
                <SimpleMap role={this.props.role}/>
            </div>
        )
    }
}
export default Home;