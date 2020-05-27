import React from 'react';
import {Link } from "react-router-dom"

import '../../constants/styles.css';
import * as ROUTES from '../../constants/routes.js'

class Landing extends React.Component {


    render() {
        return (
            <div>
                <h1>I-Reply</h1>
                <h3>Talk to yourself, your robot self</h3>
                <Link to={ROUTES.LOGIN}>Login</Link>
            </div>
        );
    }

}

export default Landing;