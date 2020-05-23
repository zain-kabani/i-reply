import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom"

import { Row, FormGroup, FormControl,  Button,  } from 'react-bootstrap';

import './App.css';

class Landing extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            email: "",
            password: "",
        };
    }

    setUsername(username) {
        this.setState({username: username});
    }

    setEmail(email){
        this.setState({email: email});
    }

    setPassword(password){
        this.setState({password: password});
    }

    validateForm() {
        return this.state.username.length > 0 && this.state.password.length > 0;
    }

    login = async(e) => {
        // prevent web page refresh
        e.preventDefault();

        // GET request here

        alert("You are successfully signed in...");
        //window.location.href = "/ChatBox"

        }

    componentDidUpdate() {
        //console.log(this.state);
    }

    render() {

        const { username, email, password } = this.state;

        return (
            <div className="Register">
                <h1>Register</h1>
                <Link to="/Login">Back to Login</Link>
                <form className="userinput" onSubmit={ (e) => this.login(e)}>
                    <FormGroup controlId="username">
                        <FormControl 
                            type="text" 
                            value={username} 
                            name="username" 
                            onChange={e => this.setUsername(e.target.value)}
                            placeholder="Username" />
                    </FormGroup>

                    <FormGroup controlId="email">
                        <FormControl 
                            type="email" 
                            value={email} 
                            name="email" 
                            onChange={e => this.setEmail(e.target.value)}
                            placeholder="Email" />
                    </FormGroup>

                    <FormGroup controlId="password">
                        <FormControl 
                            type="password" 
                            value={password} 
                            name="password" 
                            onChange={e => this.setPassword(e.target.value)}
                            placeholder="Password" />
                    </FormGroup>

                    <Button
                        type="submit" 
                        disabled={!this.validateForm()}
                        bsStyle="primary">Sign Up
                    </Button>
                </form>
        </div>
        );
    }

}

export default Landing;