import React from 'react';
import { Redirect, Link } from "react-router-dom"
import * as firebase from "firebase/app";
import { FormGroup, FormControl, Button, } from 'react-bootstrap';

import '../../constants/styles.css';
import * as ROUTES from '../../constants/routes.js'
import ChatBox from './ChatBox';
require('firebase/auth')

var conversationId = "";

class Chat extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            redirect: false,
            conversations: [],
        };
    }

    async componentDidMount() {
        // check for user authentication
        await this.props.firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                // set intial states for username, conversationId
                this.setState({ email: this.props.user.email });
                // get chatlog
                this.loadConversations(user);
            }
        }.bind(this));
    }

    loadConversations(user) {
        this.props.firebase.database().ref(
            'users/'
            + user.uid
            + '/conversations/'
        ).orderByChild("created").once("value", function (convos) {
            // this.setState({chatlog: chatlog.val()});
            var formattedarray = [];
            var retrievedconvos = convos.val();
            for (var key in retrievedconvos) {
                formattedarray.push({ name: key });
                // console.log(retrievedconvos[key]["thread"]);
            }
            this.setState({ conversations: formattedarray })
            console.log(formattedarray);
        }.bind(this))
    }

    /*setConversation(e){
        e.stopPropogation();
        this.setState({conversationId: conversation.name})
    }*/

    render() {
        return (
            <div className="Chatpage">
                <div className="conversationlist">
                    <div className="toolbar">
                        <div className="left-items">
                            <Button>Settings</Button>
                        </div>
                        <h1>Bots</h1>
                        <div className="right-items">
                            <Button>+</Button>
                        </div>
                    </div>
                    <div className="conversations">
                        {
                            this.state.conversations.map(conversation => (
                                <div className="conversation-list-item" onClick={conversationId = conversation.name}>
                                    <div className="conversation-info">
                                        <h1 className="conversation-title">{conversation.name}</h1>
                                        {/* <p className="conversation-snippet">{conversation.lastmessage}</p> */}
                                    </div>
                                </div>
                            )
                            )
                        }
                    </div>
                </div>
                <div className="chatbox">
                    <ChatBox {...this.props} {...this.state} conversationId={conversationId} />
                </div>
            </div>
        );
    }

}

export default Chat;