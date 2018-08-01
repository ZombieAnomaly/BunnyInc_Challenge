import React,  { Component } from 'react';
import { Tweet } from 'react-twitter-widgets'
import $ from "jquery";

function TwitterCard(props){
    return( <Tweet tweetId={props.tweetId}/> );
}

export default TwitterCard;