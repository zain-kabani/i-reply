import React from 'react';
import { Link, Redirect } from "react-router-dom"
import * as firebase from "firebase/app";
import { FormGroup, FormControl, Button, } from 'react-bootstrap';

import '../../constants/styles.css';
import * as ROUTES from '../../constants/routes.js';

class ResetPasswordPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            redirect: false,
        };


    }

    render() {
        const { email } = this.state;
        return (
            <div className="Resetpassword">
                <h1>
                    Reset your password
                </h1>
                <form className="userinput" onSubmit={(e) => this.resetPassword(e)}>
                    <FormGroup controlId="email">
                        <FormControl
                            type="email"
                            value={email}
                            name="email"
                            onChange={e => this.setEmail(e.target.value)}
                            placeholder="Email" />

                        <Button
                            type="submit">
                            Email Me
                        </Button>
                    </FormGroup>
                </form>
                <div className="backtologin">
                    <Link to="/Login">Back to Login</Link>
                </div>
            </div>
        )
    }
}

export default ResetPasswordPage;