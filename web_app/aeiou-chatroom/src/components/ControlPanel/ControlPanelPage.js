import React from 'react';
import {Redirect} from "react-router-dom"
import * as firebase from "firebase/app";
import { Row, FormGroup, FormControl,  Button} from 'react-bootstrap';

import '../../constants/styles.css';
import * as ROUTES from '../../constants/routes.js'

class ControlPanelPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: false,
        };
    }

    setAccountInfo(email, uid){
        console.log(email);
        this.setState(email, uid);
    }

    logOutButton() {
        firebase.auth().signOut().then(function() {
            this.setState({redirect: true});
          }.bind(this)).catch(function(error) {
            console.log(error);
          });
    }

    render() {  
        
        if (this.state.redirect){
            return <Redirect push to={ROUTES.LOGIN} />;
        } 
        
        if (this.props.userState) {
            return (
                <div>
                    <h2>User: {this.props.userState.email}</h2>
                    <h2>UID: {this.props.userState.uid}</h2>

                    <button type="submit" onClick={() => {this.logOutButton()}}>Log Out</button>
                </div>
            )
        } else {
            return <Redirect push to={ROUTES.LOGIN} />;
        }
    }
}


export default ControlPanelPage;