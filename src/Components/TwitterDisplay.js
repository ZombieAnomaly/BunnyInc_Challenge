import React from 'react';
import TwitterCard from './TwitterCard';

function TwitterDisplay(props){
    var el = [];
    for(var i=0;i<props.content.length;i++){
        el.push(
            <div className = "TweetBox" key={i}>    
                <TwitterCard tweetId={props.content[i].id_str} video={props.content[i].entities.urls[0].expanded_url}  key={i}/>
            </div>
        );
   }
    return el;
}

export default TwitterDisplay;