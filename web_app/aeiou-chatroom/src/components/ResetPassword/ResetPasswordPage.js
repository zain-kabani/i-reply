import React from 'react';
import { Link, Redirect } from "react-router-dom"
import * as firebase from "firebase/app";
import { FormGroup, FormControl, Button, } from 'react-bootstrap';

import * as ROUTES from '../../constants/routes.js';

class ResetPasswordPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            redirect: false,
        };
    }

    onChange = (e) => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
    }

    resetPassword(e){
        e.preventDefault();
        var auth = firebase.auth();
        auth.sendPasswordResetEmail(this.state.email).then(function() {
            // Email sent.
            alert("An email was sent to your account!");
          }).catch(function(error) {
            // An error happened.
            if (error + "" === "Error: There is no user record corresponding to this identifier. The user may have been deleted."){
                alert("Email address not found. Please double check the spelling.");
            } else if (error + "" === "Error: The email address is badly formatted."){
                alert("Invalid email address entered.");
            } else {
                alert(error);
            }
            // alert("Please enter a valid email address");
          });          
    }

    render() {
        const { email } = this.state;
        return (
            <div className="Resetpassword">
                <h1>
                    Reset your password
                </h1>
                <span>Enter your email below</span>
                <span>We'll send you a link to reset your password</span>
                <form className="userinput" onSubmit={(e) => this.resetPassword(e)}>
                    <FormGroup controlId="email">
                        <FormControl
                            type="email"
                            value={email}
                            name="email"
                            onChange={e => this.onChange(e)}
                            placeholder="Email" />
                    </FormGroup>
                    <Button
                        type="submit">
                        Email Me
                    </Button>
                </form>

                <div className="backtologin">
                    <Link to="/Login">Back to Login</Link>
                </div>
            </div>
        )
    }
}

export default ResetPasswordPage;