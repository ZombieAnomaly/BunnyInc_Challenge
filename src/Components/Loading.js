import React,  { Component } from 'react';

class Loading extends Component{

    constructor(props){
        super(props);
        this.state = {
            count:0
        }
        this.loadingInterval;
    }

    componentDidMount(){
        this.loadingInterval = setInterval(function(){
            let tmp = this.state.count;
            if(tmp < 3)
                this.setState({count: tmp+=1})
            else
                this.setState({count: 0})
        }.bind(this),500)
    }

    componentWillUnmount(){
        clearInterval(this.loadingInterval);
    }

    render(){
        if(this.state.count == 3)
            return (<h1 className = "Loading"> Loading... </h1>)
        if(this.state.count == 2)
            return (<h1 className = "Loading"> Loading.. </h1>)     
        if(this.state.count == 1)
            return (<h1 className = "Loading"> Loading. </h1>)   

        return (<h1 className = "Loading"> Loading </h1>)
    }
}

export default Loading;