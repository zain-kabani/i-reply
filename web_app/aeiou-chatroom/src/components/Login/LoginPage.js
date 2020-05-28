import React from 'react';
import { Redirect, Link } from "react-router-dom"
import * as firebase from "firebase/app";
import { FormGroup, FormControl, Button, } from 'react-bootstrap';

import '../../constants/styles.css';
import * as ROUTES from '../../constants/routes.js'
require('firebase/auth')

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            redirect: false,
        };
    }

    onChange = (e) => {
        e.preventDefault();

        this.setState({ [e.target.name]: e.target.value });
    }

    validateForm() {
        if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)) {
            return true;
        } else {
            return false;
        }
    }

    login = async (e) => {
        // prevent web page refresh
        e.preventDefault();
        e.stopPropagation();

        await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
            if (errorCode == "auth/user-not-found"){
                alert("Email or password incorrect. Please double check and try again.");
            } else {
                alert(errorMessage);
            }
            
        });


    }

    googleLogin = (e) => {
        e.preventDefault();

        firebase.auth().signInWithPopup(this.props.GoogleAuthProvider).then(function (result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            this.props.user = user;
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                this.setState({ redirect: true });
            }
        }.bind(this));
    }

    render() {

        const { email, password } = this.state;

        if (this.state.redirect) {
            return <Redirect push to={ROUTES.CONTROLPANEL} />;
        }

        return (
            <div className="Login">
                <h1>Login</h1>
                <span>Login to your account</span>
                <form className="userinput" onSubmit={(e) => this.login(e)}>
                    <FormGroup controlId="email">
                        <FormControl
                            type="email"
                            value={email}
                            name="email"
                            onChange={e => this.onChange(e)}
                            placeholder="Email" />
                    </FormGroup>

                    <FormGroup controlId="password">
                        <FormControl
                            type="password"
                            value={password}
                            name="password"
                            onChange={e => this.onChange(e)}
                            placeholder="Password" />
                    </FormGroup>

                    <div className="resetpassword">
                        <Link to={ROUTES.RESETPASSWORD}>Forgot your password?</Link>
                    </div>

                    <Button
                        type="submit"
                        disabled={!this.validateForm()}>
                        Sign In
                    </Button>
                </form>
                <span>OR</span>
                <form className="googlesignin" onSubmit={(e) => (this.googleLogin(e))}>
                    <Button type="submit">
                        <img className="googleicon" alt="Google sign-in" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" />
                        {' '}Sign in with Google
                    </Button>
                </form>
                <div className="register">
                    <span>No account? {' '}
                        <Link to={ROUTES.REGISTER}>Sign Up!</Link>
                    </span>
                </div>
            </div>
        );
    }
}

export default LoginPage;