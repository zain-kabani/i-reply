import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom"
import * as firebase from "firebase";

import Landing from "../Landing/Landing.js";
import Login from "../Login/LoginPage.js";
import Chat from "../Chat/Chat.js";
import Register from "../Register/RegisterPage.js";
import ControlPanel from "../ControlPanel/ControlPanelPage.js";
import ResetPassword from '../ResetPassword/ResetPasswordPage.js';

import '../../constants/styles.css';
import * as ROUTES from '../../constants/routes.js';



class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            firebase: firebase,
            GoogleAuthProvider: this.props.GoogleAuthProvider,
        }
    }

    componentDidMount() {
        this.authListener();
    }

    authListener() {
        firebase.auth().onAuthStateChanged(function (user) {
            // if user is logged in
            if (user) {
                this.setState({ user: user });
            } else {
                this.setState({ user: null });
            }
        }.bind(this))
    }

    render() {
        return (
            <Router>
                <div className="App">
                    <Switch>
                        {/* exact specifies rendering to exactly '/' */}
                        <Route path={ROUTES.LANDING} exact component={Landing} />

                        <Route path={ROUTES.LOGIN} render={props =>
                            (<Login {...this.state} />)}
                        />

                        <Route path={ROUTES.CHAT} render={props =>
                            (<Chat {...this.state} />)}
                        />

                        <Route path={ROUTES.REGISTER} render={props =>
                            (<Register {...this.state} />)}
                        />

                        <Route path={ROUTES.CONTROLPANEL} render={props =>
                            (<ControlPanel {...this.state} />)}
                        />

                        <Route path={ROUTES.RESETPASSWORD} render={props =>
                            (<ResetPassword {...this.state} />)}
                        />

                        <Redirect to="/" />
                    </Switch>
                </div>
            </Router>
        )
    }

}

export default App;
