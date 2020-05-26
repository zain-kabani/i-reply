import React from 'react';
import {Link, Redirect} from "react-router-dom"
import * as firebase from "firebase/app";
import {FormGroup, FormControl,  Button,  } from 'react-bootstrap';

import '../../constants/styles.css';
import * as ROUTES from '../../constants/routes.js';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            passwordconfirm: '',
            errors: {
                email: ' ',
                password: ' ',
              },
            redirect: false,
        };
    }

    onChange = (e) => {
        e.preventDefault();
        this.setState({[e.target.name]: e.target.value});
        
        switch(e.target.name){
            case "password":
                this.validatePassword();
                break;
            case "email":
                this.validateEmail();
                break;
            case "passwordconfirm":
                this.confirmPassword();
                break;
        }
        
    }

    validateForm(){
        return this.validateEmail() && this.validatePassword() && this.confirmPassword();
    }

    validateEmail() {
        let {email, errors} = this.state;
        const valid = (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email));

        if (!valid){
            errors.email = "Must provide a valid email";
        } else {
            errors.email = " ";
        }

        return valid;
    }

    validatePassword() {
        let {password, errors} = this.state;
        const valid = password.length > 7;

        if (!valid){
            errors.password = "Password must be at least 8 characters";
        } else {
            this.confirmPassword();
        }

        return valid;
    }

    confirmPassword() {
        let {password, passwordconfirm, errors} = this.state;
        const valid = password === passwordconfirm;
        if (!valid){
            errors.password = "Passwords must match"
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

            // on successful account creation, route user
            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    alert("Account created!");
                    this.setState({redirect: true});
                }
            }.bind(this));
            
        } else {
            alert("Invalid email or password!");
        }

    }

    render() {

        const { username, email, password, passwordconfirm, errors} = this.state;
        
        if (this.state.redirect) {
            return <Redirect push to={ROUTES.LOGIN} />;
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
                            onChange={e => this.onChange(e)}
                            placeholder="Email" />
                    </FormGroup>

                    <span className="error">{errors.email}</span>

                    <FormGroup controlId="password">
                        <FormControl 
                            type="password" 
                            value={password} 
                            name="password" 
                            onChange={e => this.onChange(e)}
                            placeholder="Password" />
                    </FormGroup>

                    <FormGroup controlId="passwordconfirm">
                        <FormControl 
                            type="password" 
                            value={passwordconfirm} 
                            name="passwordconfirm" 
                            onChange={e => this.onChange(e)}
                            placeholder="Confirm password" />
                    </FormGroup>

                    <span className="error">{errors.password}</span>

                    <Button
                        type="submit" 
                        disabled={!this.validateForm()}>
                            Sign Up
                    </Button>
                </form>
                <Link to="/Login">Back to Login</Link>
        </div>
        );
    }

}

export default RegisterPage;