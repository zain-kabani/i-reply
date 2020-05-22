import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom"

import './App.css';

class Landing extends React.Component {


    render() {
        return(
            <Link to="/LoginPage">Login</Link>
        );
    }

}

export default Landing;