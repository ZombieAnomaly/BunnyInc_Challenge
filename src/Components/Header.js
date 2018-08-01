import React, {Component} from 'react';
import $ from "jquery";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
library.add(fab, faEnvelope );

class Header extends Component{

    constructor(props){
        super(props);
        this.state = {url: 'youtube.com/watch?', content: '', tweeted:false};

        //method binding to expose 'this' in instance methods
        this.postStatus = this.postStatus.bind(this);
        this.handleChangeURL = this.handleChangeURL.bind(this);
        this.handleChangeContent = this.handleChangeContent.bind(this);
        this.postStatus = this.postStatus.bind(this);
    }

    handleChangeURL(event) {
        this.setState({url: event.target.value});
    }
    handleChangeContent(event) {
        this.setState({content: event.target.value});
    }

    postStatus(){

        //validate the new post input!
        if(this.state.content == ""){ 
            $('#Content').css('border','1px solid red'); 
        }else{ 
            $('#Content').css('border','none'); 
        }

         //validate the new post input!
        if(this.state.url == "youtube.com/watch?" || !this.state.url.includes('youtu')){
            $('#URL').css('border','1px solid red'); return;
        }else{
            $('#URL').css('border','none');
        }

        //new post input validated, make API call
        $.post("APIs/PostTweet.php", {data:this.state},
        function(data, status){
            console.log("posted: ", JSON.parse(data));
            this.setState({tweeted:true});
            setTimeout(function(){
                this.setState({tweeted:false});
            }.bind(this), 4000);
        }.bind(this));   
    }

    render(){
        if(this.state.tweeted == false){
            return(
                <div className = "Header">
                    <h1 className="Title">#NowPlaying <span className="city">{this.props.city}</span> </h1>

                    <label htmlFor="URL">Video URL: 
                        <input id="URL" type="text"  value={this.state.url} onChange={this.handleChangeURL} name="URL"/>
                    </label>

                    <label htmlFor="Comment">Content:  
                        <input id="Content" type="text" maxLength='140' name="Comment" value={this.state.content} onChange={this.handleChangeContent} />
                    </label>

                    <button onClick = {this.postStatus} className ="NewStatus"> <FontAwesomeIcon size="lg" color="#55acee" icon={['fab', 'twitter']} /> Tweet to #NowPlaying</button>

                    <button onClick = {this.props.onReset} className ="ResetLocation"> Reset Location </button>
                </div>
            )
        }else{
            return(
                <div className = "Header">
                    <h1 className="Title">#NowPlaying <span className="city">{this.props.city}</span> </h1>

                    <label htmlFor="URL">Video URL: 
                        <input id="URL" type="text"  value={this.state.url} onChange={this.handleChangeURL} name="URL"/>
                    </label>

                    <label htmlFor="Comment">Content:  
                        <input id="Content" type="text" maxLength='140' name="Comment" value={this.state.content} onChange={this.handleChangeContent} />
                    </label>

                    <h3>Nice, you Tweeted!</h3>
                </div> 
            )           
        }
    }
}



export default Header;