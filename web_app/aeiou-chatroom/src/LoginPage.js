import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom"

import { Row, FormGroup, FormControl,  Button,  } from 'react-bootstrap';

import './App.css';
import ChatBox from "./ChatBox.js"

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            formData: {}, // login form data
            errors: {}, // login field errors
        };
    }

    login(e) {
        // prevent web page refresh
        e.preventDefault();

        //alert("You are successfully signed in...");
        window.location.href = "/ChatBox"

        }

    componentDidUpdate() {
    }

    render() {

        const { errors, formSubmitted } = this.state;

        return (
            <div className="Login">
                <Router>
                    <Switch>
                        <Route path="/LoginPage">
                            <h1>Login</h1>
                            <form className="userinput" onSubmit={ (e) => this.login(e)}>
                                <FormGroup controlId="email" validationState={ formSubmitted ? (errors.email ? 'error' : 'success') : null }>
                                    <FormControl type="text" name="email" placeholder="Email" />

                                </FormGroup>
                                <FormGroup controlId="password" validationState={ formSubmitted ? (errors.password ? 'error' : 'success') : null }>
                                    <FormControl type="password" name="password" placeholder="Password" />
    
                                </FormGroup>
                                <Button type="submit" bsStyle="primary">Sign-In</Button>
                            </form>
                        </Route>

                        <Route path="/ChatBox"> 
                            <ChatBox />
                        </Route>

                    </Switch>
                </Router>
            </div>
        );
    }
}

export default LoginPage;