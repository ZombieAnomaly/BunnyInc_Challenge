import React,  { Component } from 'react';
import Geocode from "react-geocode";

class GetLocation extends Component{

    constructor(props){
        super(props);
        this.state = {
            location: "Seattle, WA",
            coords: null
        }   
        Geocode.setApiKey("AIzaSyAlLAr7NK-jwHu8dTPrHPzmmECL-4wuWKE");

        this.geocodeAddress = this.geocodeAddress.bind(this);
        this.handleChangeLoc = this.handleChangeLoc.bind(this);
    }

    handleChangeLoc(event) {
        this.setState({location: event.target.value});
    }
    
    geocodeAddress() {
        // Get latidude & longitude from address.
        Geocode.fromAddress(this.state.location).then(
            response => {
                const { lat, lng } = response.results[0].geometry.location;
                this.props.onChange([lat,lng]);
            },
            error => { console.error(error); }
        );
    }

    render(){
        return(
        <div id="floating-panel">
            <h1> Enter your Location </h1>
            <input id="address" value={this.state.location} onChange={this.handleChangeLoc} type="textbox"/>
            <input id="submitLoc" onClick = {this.geocodeAddress} type="button" value="Enter"/>
        </div>
        );
    }
}

export default GetLocation;