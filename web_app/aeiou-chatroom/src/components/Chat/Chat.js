import React from 'react';
import { Redirect, Link } from "react-router-dom"
import * as firebase from "firebase/app";
import { FormGroup, FormControl, Button, } from 'react-bootstrap';

import '../../constants/styles.css';
import * as ROUTES from '../../constants/routes.js'
require('firebase/auth')

class Chat extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            redirect: false,
        };
    }


    render() {
        return (
            /*
            <div className="conversationlist">
                <div className="toolbar">
                    <div className="left-items">
                        <Button>Settings</Button>
                    </div>
                    <h1>Conversations</h1>
                    <div className="right-items">
                        <Button>+bot</Button>
                    </div>
                </div>
                {
                    conversations.map(conversation => (
                        <div className="conversation-list-item">
                            <div className="conversation-info">
                                <h1 className="conversation-title">NAME</h1>
                                <p className="conversation-snippet">CONVERSATION</p>
                            </div>
                        </div>
                    )
                    )
                }
            </div>
            */
        );
    }

}

export default Chat;