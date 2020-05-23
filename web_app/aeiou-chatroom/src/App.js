import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"

import './App.css';
import Landing from "./Landing.js";
import LoginPage from "./LoginPage.js";
import ChatBox from "./ChatBox.js";
import Register from "./RegisterPage.js"

function App() {

    return (
        <Router>
            <div className="App">
                <Switch>
                    /* exact specifies rendering to exactly '/' */
                    <Route path="/" exact component={Landing} />

                    <Route path="/Login" component={LoginPage} />

                    <Route path="/ChatBox" component={ChatBox} />

                    <Route path="/Register" component={Register} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
