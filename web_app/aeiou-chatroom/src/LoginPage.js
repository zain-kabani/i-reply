import React from 'react';
import {Redirect, Link} from "react-router-dom"
import * as firebase from "firebase/app";
import {FormGroup, FormControl,  Button,  } from 'react-bootstrap';

import './App.css';
import ChatBox from "./ChatBox.js"

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            redirect: false,
        };
    }

    setEmail(email) {
        this.setState({email: email});
    }

    setPassword(password){
        this.setState({password: password});
    }

    validateForm() {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)) {
            return true;
        } else {
            return false;
        }
    }

    login = async(e) => {
        // prevent web page refresh
        e.preventDefault();
        e.stopPropagation();

        await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
            alert(errorMessage);
          });
          
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                this.setState({redirect: true});
            }
        }.bind(this));
    }

    render() {

        const { email, password } = this.state;

        if (this.state.redirect) {
            return <Redirect push to="/ControlPanel" />;
        }

        return (
            <div className="Login">
                <h1>Login</h1>
                <form className="userinput" onSubmit={ (e) => this.login(e)}>
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
                        bsStyle="primary">Sign-In
                    </Button>
                </form>
                <Link to="/Register">Sign Up!</Link>
            </div>
        );
    }
}

export default LoginPage;