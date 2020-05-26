import React from 'react';
import ReactDOM from 'react-dom';

import '../../constants/styles.css';
import ChatMessage from '../Chat/ChatMessage.js'

class ChatBox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "User",
            chatlog: []
        };
    }

    componentDidUpdate() {
        const chatRef = ReactDOM.findDOMNode(this.refs.chatmessages);
        chatRef.scrollTop = chatRef.scrollHeight;
    }

    addMessage = (databody) => {
        // add the message to the chatlog
        this.setState((prevState) => ({
            chatlog: [...prevState.chatlog,
            {
                user: databody.user,
                message: <p>{databody.message}</p>
            }]
        }), () => {
            // clear message input box after adding new message to chatlog
            ReactDOM.findDOMNode(this.refs.message).value = "";
        });

    }

    submitMessage = (eh) => {
        // prevent web page refresh
        eh.preventDefault();

        const userMessage = ReactDOM.findDOMNode(this.refs.message).value;
        if (userMessage.trim() === "") {
            console.log("empty input");
        } else {
            let databody = { "user": this.state.username, "message": userMessage };
            this.addMessage(databody);

            // send the message to the backend
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(databody)
            };
            console.log(requestOptions);
            fetch('/test_api', requestOptions)
                .then(response => response.json())
                .then(data => this.addMessage({ "user": "Bot", "message": data.message }));
        }
    }

    render() {
        return (
            <div className="chatbox">
                <h1>aeiou chatbox</h1>
                <ul className="chatmessages" ref="chatmessages">
                    {
                        this.state.chatlog.map((chatitem) =>
                            <ChatMessage
                                chatitem={chatitem}
                                username={this.state.username}
                            />
                        )
                    }
                </ul>
                <form className="userinput" onSubmit={(eh) => this.submitMessage(eh)}>
                    <input type="text" ref="message" />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }

}


export default ChatBox;