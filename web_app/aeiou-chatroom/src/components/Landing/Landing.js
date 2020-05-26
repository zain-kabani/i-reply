import React from 'react';
import {Link } from "react-router-dom"

import '../../constants/styles.css';
import * as ROUTES from '../../constants/routes.js'

class Landing extends React.Component {


    render() {
        return (
            <div>
                <h1>Hello there! Please head to the login page (:</h1>
                <Link to={ROUTES.LOGIN}>Login</Link>
            </div>
        );
    }

}

export default Landing;