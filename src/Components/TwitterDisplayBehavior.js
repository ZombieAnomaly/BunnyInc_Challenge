import React, { Component } from 'react';
import $ from "jquery";
import TwitterDisplay from './TwitterDisplay';
import Loading from './Loading';
import GetLocation from './GetLocation';
import Geocode from "react-geocode";

class SLL{

  constructor(){
    this.head = null;
    this.tail = null;
  }

  addToBack(node){
    if(this.head == null){
      this.head = node;
      return;
    }
    
    if(this.tail == null){
      this.tail = node; this.head.next = node;
      return;
    }

    this.tail.next = node;
    this.tail = node;
  }

  addToFront(node){
    if(this.head == null){
      this.head = node;
      return;
    }
    node.next = this.head;
    this.head = node;
  }

  printContents(){
    let cur = this.head;
    let temp;
    let contentsArr = [cur.data];
    while(cur.next != null){
      temp = cur.next;
      contentsArr.push(temp.data);
      cur = temp;
    }
    return contentsArr;
  }
}

class Node{
  constructor(Data, Next){
    this.data = Data;
    this.next = Next;
  }
}

class TwitterDisplayBehavior extends Component {

  constructor(props){
    super(props);
    this.state = {
      result:null
    }
    
    Geocode.setApiKey("AIzaSyAlLAr7NK-jwHu8dTPrHPzmmECL-4wuWKE");

    //method bindings to expose this in instance methods
    this.render = this.render.bind(this);
    this.searchForTweets = this.searchForTweets.bind(this);
    this.updateTweets = this.updateTweets.bind(this);
    this.updateLocation = this.updateLocation.bind(this);
  }
  
  searchForTweets(){
    
    if(this.props.data.city == null){ //didn't process user cords to get city name, do that now
      Geocode.fromLatLng(this.props.data.location.coords.latitude, this.props.data.location.coords.longitude).then(
        response => {
          let address = response.results[0];
          for(var i=0;i<address.address_components.length;i++){
            if(response.results[0].address_components[i].types.includes("locality"))
              this.props.cityUpdate(response.results[0].address_components[i].long_name);
          }
        },
        error => {
          console.error(error);
        }
      );
      return;
    }
    
    //at this point we have user city and should search for our initial tweets nearby!
    let tempData = [];
    $.post("APIs/SearchTweets.php", {data:this.props.data},
      function(data, status){
          var dataJSON = JSON.parse(data);
          tempData = dataJSON.statuses.slice(0,5); //get 5 most recent results
          let tempSLL = new SLL(); //store tweets in Single Linked List for effecient insertion 

          for(var i=0;i<tempData.length;i++){
              tempSLL.addToBack(new Node(tempData[i],null))
          }

          this.setState({ result:tempSLL });
          setInterval(this.updateTweets,120000) //every 2 minutes, check for new tweets!

      }.bind(this));    
    }

  //After our intiial search, we call the twitter API again and compare results.
  //only updating the difference between the two results
  updateTweets(){
    let tempData = [];
    let diff_index; //track the index our older results start
    
    $.post("APIs/SearchTweets.php", {data:this.props.data},
      function(data, status){
          var dataJSON = JSON.parse(data);

          // detected a diff in our old statuses vs new ones
          if(dataJSON.statuses[0].id_str !== this.state.result.head.data.id_str){ 
            
            for(var i=0;i<dataJSON.statuses.length;i++){ //loop through results to find where our old results begin
              if(dataJSON.statuses[i].id_str === this.state.result.head.data.id_str){
                diff_index = i; break;
              }
            }

            //slice only the newest results
            tempData = dataJSON.statuses.slice(0,diff_index);
            let tempSLL = this.state.result; //get the old list of tweets

            for(var j=tempData.length-1;j>=0;j--){ //add new results to front (top) of list
              tempSLL.addToFront(new Node(tempData[j],null))
            }     

            this.setState({result:tempSLL});
          }
      }.bind(this));      
  }

  updateLocation(e){
    this.props.onChange(e);
  }

  render(){

    if(this.props.data.canLocate == false){
      return(<GetLocation value="" onChange={this.updateLocation}/>);
    }

    if(this.state.result == null || this.props.data.location == null){
      if(this.props.data.location != null){this.searchForTweets();}
      return(<Loading/>);
    }
    
    return(
      <div className = "TwitterDisplay">
        <TwitterDisplay content={this.state.result.printContents()}/>
      </div>
    );
     
  }

}

export default TwitterDisplayBehavior;
