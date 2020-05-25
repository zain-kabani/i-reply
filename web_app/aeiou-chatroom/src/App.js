import React from 'react';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom"
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";


import './App.css';
import Landing from "./Landing.js";
import LoginPage from "./LoginPage.js";
import ChatBox from "./ChatBox.js";
import Register from "./RegisterPage.js"
import ControlPanel from "./ControlPanelPage.js"

import firebaseConfig from "./firebase.conf.js"

function App() {    

    firebase.initializeApp(firebaseConfig);

    return (
        <Router>
            <div className="App">
                <Switch>
                    /* exact specifies rendering to exactly '/' */
                    <Route path="/" exact component={Landing} />

                    <Route path="/Login" component={LoginPage} />

                    <Route path="/ChatBox" component={ChatBox} />

                    <Route path="/Register" component={Register} />

                    <Route path="/ControlPanel" component={ControlPanel} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
