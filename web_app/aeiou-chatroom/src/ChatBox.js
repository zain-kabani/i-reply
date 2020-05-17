import React from 'react';
import ReactDOM from 'react-dom';

import './App.css';
import ChatMessage from './ChatMessage.js'

class ChatBox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "User",
            chatlog: [
            {
                user: "User",
                message: <p>user input yeet</p>
            },
            {
                user: "Bot",
                message: <p>bot output yote</p>
            },
            ]
        };
    }

    componentDidUpdate() {
        const chatRef = ReactDOM.findDOMNode(this.refs.chatmessages);
        chatRef.scrollTop = chatRef.scrollHeight;
    }


    submitMessage = (eh) => {
        // prevent web page refresh
        eh.preventDefault();
        
        const userMessage = ReactDOM.findDOMNode(this.refs.message).value;
        if (userMessage.trim() === ""){
            console.log("empty input");
        } else {
            // add the message to the chatlog
            this.setState((prevState) => ({chatlog: [...prevState.chatlog, 
                {user: this.state.username, 
                message: <p>{userMessage}</p>}]
            }), () => {
                // clear message input box after adding new message to chatlog
                ReactDOM.findDOMNode(this.refs.message).value = "";
            });

            // send the message to the backend
            /*
            let databody = {"user": this.state.username, "message": userMessage};
            console.log(databody);
            fetch('/test_api', {
                method: 'POST',
                body: JSON.stringify(databody),
                headers: {
                    'Content-Type': 'application/json'
            },})
            .then(res => res.json())
            .then(data => console.log(data));
            */
           const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: 'React POST Request Example' })
            };
            console.log(requestOptions);
            fetch('/test_api', requestOptions)
                .then(response => response.json())
                .then(data => this.setState({ postId: data.id }));
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
                    <input type="text" ref="message"/>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }

}


export default ChatBox;