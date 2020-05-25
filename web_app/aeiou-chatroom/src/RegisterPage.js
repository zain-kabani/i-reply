import React from 'react';
import {Link, Redirect} from "react-router-dom"
import * as firebase from "firebase/app";
import {FormGroup, FormControl,  Button,  } from 'react-bootstrap';

import './App.css';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            errors: {
                email: ' ',
                password: ' ',
              },
            redirect: false,
        };
    }

    setEmail(e){
        const email = e.target.value
        e.preventDefault();
        this.validateEmail(email)
        this.setState({email: email});
    }

    setPassword(e){
        const password = e.target.value
        e.preventDefault();
        this.validatePassword(password)
        this.setState({password});
    }

    validateForm(){
        return this.validateEmail(this.state.email)
                && this.validatePassword(this.state.password);
    }

    validateEmail(email) {
        let errors = this.state.errors;
        const valid = (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email));

        if (!valid){
            errors.email = "Must provide a valid email";
        } else {
            errors.email = " ";
        }

        return valid;
    }

    validatePassword(password) {
        let errors = this.state.errors;
        const valid = password.length > 7;

        if (!valid){
            errors.password = "Password must be at least 8 characters";
        } else {
            errors.password = " ";
        }

        return valid;
    }

    createAccount = async(e) => {
        // prevent web page refresh
        e.preventDefault();
        e.stopPropagation();

        if (this.validateForm){
            // create an account with Google firebase
            await firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
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
            
        } else {
            alert("Invalid email or password!");
        }

    }

    render() {

        const { username, email, password, errors} = this.state;
        
        if (this.state.redirect) {
            return <Redirect push to="/ControlPanel" />;
        }

        return (
            <div className="Register">
                <h1>Register</h1>
                <form className="userinput" onSubmit={ (e) => this.createAccount(e)}>
                    <FormGroup controlId="email">
                        <FormControl 
                            type="email" 
                            value={email} 
                            name="email" 
                            onChange={e => this.setEmail(e)}
                            placeholder="Email" />
                    </FormGroup>

                    <span className="error">{errors.email}</span>

                    <FormGroup controlId="password">
                        <FormControl 
                            type="password" 
                            value={password} 
                            name="password" 
                            onChange={e => this.setPassword(e)}
                            placeholder="Password" />
                    </FormGroup>

                    <span className="error">{errors.password}</span>

                    <Button
                        type="submit" 
                        disabled={!this.validateForm()}
                        bsStyle="primary">Sign Up
                    </Button>
                </form>
                <Link to="/Login">Back to Login</Link>
        </div>
        );
    }

}

export default RegisterPage;