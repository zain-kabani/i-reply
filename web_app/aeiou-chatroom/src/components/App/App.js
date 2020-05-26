import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import * as firebase from "firebase/app";

import Landing from "../Landing/Landing.js";
import Login from "../Login/LoginPage.js";
import Chat from "../Chat/ChatBox.js";
import Register from "../Register/RegisterPage.js";
import ControlPanel from "../ControlPanel/ControlPanelPage.js";

import '../../constants/styles.css';
import * as ROUTES from '../../constants/routes.js';



class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {}
        }
    }

    componentDidMount() {
        this.authListener();
    }

    authListener() {
        firebase.auth().onAuthStateChanged(function(user){
            // if user is logged in
            if (user) {
                this.setState({user: user});
            } else {
                this.setState({user: null});
            }
        }.bind(this))
    }

    render() {
        return (
            <Router>
                <div className="App">
                    <Switch>
                        /* exact specifies rendering to exactly '/' */
                        <Route path={ROUTES.LANDING} exact component={Landing} />

                        <Route path={ROUTES.LOGIN} render={props => 
                            (<Login userState={this.state.user}/>)} 
                        />

                        <Route path={ROUTES.CHAT} render={props => 
                            (<Chat userState={this.state.user}/>)} 
                        />

                        <Route path={ROUTES.REGISTER} render={props => 
                            (<Register userState={this.state.user}/>)} 
                        />

                        <Route path={ROUTES.CONTROLPANEL} render={props => 
                            (<ControlPanel userState={this.state.user}/>)} 
                        />
                    </Switch>
                </div>
            </Router>
        )
    }

}

export default App;
