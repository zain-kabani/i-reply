import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"

import './App.css';

class Landing extends React.Component {


    render() {
        return (
            <div>
                <h1>Hello there! Please head to the login page (:</h1>
                <Link to="/Login">Login</Link>
            </div>
        );
    }

}

export default Landing;