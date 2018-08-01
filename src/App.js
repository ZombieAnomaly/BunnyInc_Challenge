import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import $ from "jquery";
import TwitterDisplayBehavior from './Components/TwitterDisplayBehavior';
import Header from './Components/Header';

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      location:null,
      search:"#nowplaying",
      canLocate: true,
      city:null
    }

    //bindings so we can reference 'this' in our instance methods
    this.showPosition = this.showPosition.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleLocationReset = this.handleLocationReset.bind(this);
    this.handleCityUpdate = this.handleCityUpdate.bind(this);

    this.getLocation();
  }

  getLocation() { //we ask for the users location via the browser, if it fails set CanLocate False
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.showPosition, function(err){
          console.log(err);
          this.setState({canLocate:false});
        }.bind(this));
    } else {
        console.log("Geolocation is not supported by this browser.");
        this.setState({canLocate:false});
    }
    
  }
  
  showPosition(position) {
    this.setState({location:position, canLocate: true});
  }
  

  // EVENT METHODS - these methods will change the state, re-rendering the DOM

  //location has been changed
  handleLocationChange(coords){
    let location = {
      coords:{
        latitude:coords[0],
        longitude:coords[1]
      }
    };

    this.setState({ location: location, canLocate: true });
  }

  //user requests to reset location
  handleLocationReset(){
    this.setState({ canLocate: false });
  }

  //gecoded user coords to city name
  handleCityUpdate(city){
    this.setState({ city: city });
  }


  
  render() {
    return (
      <div className="App">
        <Header city={this.state.city} onReset = {this.handleLocationReset} />
        <TwitterDisplayBehavior cityUpdate={this.handleCityUpdate} onChange={this.handleLocationChange} data={this.state} />
      </div>
    );
  }
}

export default App;
