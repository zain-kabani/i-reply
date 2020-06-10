import React from 'react';
import { Link, Redirect } from "react-router-dom"
import { FormGroup, FormControl, Button, } from 'react-bootstrap';

import * as ROUTES from '../../constants/routes.js';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            passwordconfirm: '',
            errorEmail: ' ',
            errorPassword: ' ',
            validEmail: false,
            validPassword: false,
            validPasswordconfirm: false,
            redirect: false,
        };
    }

    componentDidUpdate() {
        console.log(this.state);
    }


    onChange = (e) => {
        e.preventDefault();

        this.setState({ [e.target.name]: e.target.value }, () => {
            this.validateEmail();
            this.validatePassword();
            // this.confirmPassword();
        });
    }


    validateForm() {
        return (this.state.validEmail
            && this.state.validPassword
            && this.state.validPasswordconfirm);
    }

    validateEmail() {
        let { email } = this.state;
        const valid = (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email));

        if (!valid) {
            this.setState({ validEmail: false, errorEmail: "Must provide a valid email" });
        } else {
            this.setState({ validEmail: true, errorEmail: "" });
        }
    }

    validatePassword() {
        let { password } = this.state;
        const valid = password.length > 7;

        if (!valid) {
            this.setState({ validPassword: false, errorPassword: "Password must be at least 8 characters" });
        } else {
            this.setState({ validPassword: true, errorPassword: "" });
            this.confirmPassword();
        }
    }

    confirmPassword() {
        let { password, passwordconfirm } = this.state;
        const valid = (password === passwordconfirm);

        if (!valid) {
            this.setState({ validPasswordconfirm: false, errorPassword: "Passwords must match" });
        } else {
            this.setState({ validPasswordconfirm: true, errorPassword: " " });
        }
    }

    createAccount = async (e) => {
        // prevent web page refresh
        e.preventDefault();
        e.stopPropagation();

        if (this.validateForm) {
            // create an account with Google this.props.firebase
            await this.props.firebase.auth()
                .createUserWithEmailAndPassword(this.state.email, this.state.password)
                .catch(function (error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log(errorCode);
                    console.log(errorMessage);
                    alert(errorMessage);
                });

            // on successful account creation, route user
            this.props.firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                    alert("Account created!");
                    this.setState({ redirect: true });
                }
            }.bind(this));

        } else {
            alert("Invalid email or password!");
        }

    }

    render() {

        const { email, password, passwordconfirm, errorEmail, errorPassword } = this.state;

        if (this.state.redirect) {
            return <Redirect push to={ROUTES.LOGIN} />;
        }

        return (
            <div className="Register">
                <h1>Register</h1>
                <span>Make a new account </span>
                <form className="userinput" onSubmit={(e) => this.createAccount(e)}>
                    <FormGroup controlId="email">
                        <FormControl
                            type="email"
                            value={email}
                            name="email"
                            onChange={e => this.onChange(e)}
                            placeholder="Email" />
                    </FormGroup>

                    <span className="error">{errorEmail}</span>

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

                    <span className="error">{errorPassword}</span>

                    <Button
                        type="submit"
                        disabled={!this.validateForm()}>
                        Sign Up
                    </Button>
                </form>
                <div className="backtologin">
                    <Link to="/Login">Back to Login</Link>
                </div>

            </div>
        );
    }

}

export default RegisterPage;