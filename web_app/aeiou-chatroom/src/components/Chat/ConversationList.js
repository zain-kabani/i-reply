import React from 'react';
import {Button, } from 'react-bootstrap';

class ConversationList extends React.Component {

    logOut(e) {
        this.props.firebase.auth().signOut().then(function () {
            // successfully log out
        }).catch(function (error) {
            // An error happened.
            alert(error);
        });
    }

    newBot(e) {
        e.preventDefault();

    }

    render() {

        var { conversations, } = this.props;

        return (
            <div className="conversationlist">
                <div className="toolbar">
                    <div className="left-items">
                        <Button>Settings</Button>
                    </div>
                    <h1>Bots</h1>
                    <div className="right-items">
                        <Button onClick={e => { this.newBot(e) }}>+</Button>
                    </div>
                </div>
                <div className="conversations">
                    {
                        conversations.map(conversation => (
                            <div className="conversation-list-item" onClick={e => {
                                this.props.setConversation(conversation.name)
                            }}>
                                <div className="conversation-info">
                                    <h1 className="conversation-title">{conversation.name}</h1>
                                    {/* <p className="conversation-snippet">{conversation.lastmessage}</p> */}
                                </div>
                            </div>
                        )
                        )
                    }
                </div>
                <div className="bottombar">
                    <Button onClick={e => { this.logOut(e) }}>Log Out</Button>
                </div>
            </div>
        )
    }
}

export default ConversationList;