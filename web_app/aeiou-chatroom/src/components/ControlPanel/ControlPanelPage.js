import React from 'react';
import { Redirect } from "react-router-dom"
import { Row, FormGroup, FormControl, Button } from 'react-bootstrap';

import '../../constants/styles.css';
import * as ROUTES from '../../constants/routes.js'

class ControlPanelPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: false,
        };
    }

    setAccountInfo(email, uid) {
        console.log(email);
        this.setState(email, uid);
    }

    logOutButton() {
        this.props.firebase.auth().signOut().then(function () {
            this.setState({ redirect: true });
        }.bind(this)).catch(function (error) {
            console.log(error);
        });
    }

    render() {

        if (this.state.redirect) {
            return <Redirect push to={ROUTES.LOGIN} />;
        }

        if (this.props.user) {
            return (
                <div>
                    <h1>User Settings</h1>
                    <h2>User: {this.props.user.email}</h2>

                    <form className="userinput" onSubmit={(e) => this.resetPassword(e)}>
                        <Button
                            type="submit">
                            Delete my account
                        </Button>
                    </form>

                    <button type="submit" onClick={() => { this.logOutButton() }}>Log Out</button>
                </div>
            )
        } else {
            return <Redirect push to={ROUTES.LOGIN} />;
        }
    }
}


export default ControlPanelPage;