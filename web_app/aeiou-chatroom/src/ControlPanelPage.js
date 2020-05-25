import React from 'react';
import {Redirect} from "react-router-dom"
import * as firebase from "firebase/app";
import { Row, FormGroup, FormControl,  Button} from 'react-bootstrap';

import './App.css';

class ControlPanelPage extends React.Component {
    constructor(props) {
        super(props);
        
        var user = firebase.auth().currentUser;

        this.state = {
            user: user,
            redirect: false,
        };
        
          
    }

    setAccountInfo(email, uid){
        console.log(email);
        this.setState(email, uid);
    }
    /*
    componentWillMount(){
        var user = firebase.auth().currentUser;
        if (user) {
            this.setState({user: user});
        }
    }*/

    logOutButton() {
        this.setState({redirect: true});
    }

    render() {  
        
        if (this.state.redirect){
            return <Redirect push to="/Login" />;
        } else if (this.state.user) {
            return (
                <div>
                    <h2>User: {this.state.user.email}</h2>
                    <h2>UID: {this.state.user.uid}</h2>

                    <button type="submit" onClick={() => {this.logOutButton()}}>Log Out</button>
                </div>
            )
        } else {
            return (
                <div>
                    <span>not logged in</span>
                </div>
            )
        }
    }
}


export default ControlPanelPage;