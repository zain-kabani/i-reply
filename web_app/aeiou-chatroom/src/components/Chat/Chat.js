import React from 'react';
import { Redirect, } from "react-router-dom"

import * as ROUTES from '../../constants/routes.js'
import ChatBox from './ChatBox';
import ConversationList from './ConversationList'
require('firebase/auth')

class Chat extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            conversationId: "",
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
            } else {
                // if not logged in, redirect back to login page
                this.setState({ redirect: true });
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

    setConversation = (conversationId) => {
        this.setState({ conversationId });
        console.log(conversationId);
    }

    render() {
        if (this.state.redirect) {
            return <Redirect push to={ROUTES.LOGIN} />;
        } else {
            return (
                <div className="Chatpage">
                    <ConversationList {...this.props} {...this.state} setConversation={this.setConversation} />
                    <ChatBox {...this.props} {...this.state} key={this.state.conversationId} />
                </div>
            );
        }
    }

}

export default Chat;