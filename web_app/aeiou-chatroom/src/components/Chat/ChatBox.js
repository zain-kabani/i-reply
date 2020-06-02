import React from 'react';
import ReactDOM from 'react-dom';

import '../../constants/styles.css';
import ChatMessage from '../Chat/ChatMessage.js'

class ChatBox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            conversationId: "",
            chatlog: []
        };
    }

    componentDidUpdate() {
        const chatRef = ReactDOM.findDOMNode(this.refs.chatmessages);
        chatRef.scrollTop = chatRef.scrollHeight;
    }

    async componentDidMount() {
        // check for user authentication
        await this.props.firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                // set intial states for username, conversationId
                this.setState({ email: this.props.user.email, conversationId: "chatbot 1" })
                // get chatlog
                this.loadChatLog(user);
            }
        }.bind(this));

        console.log(this.props.user.uid);
    }

    loadChatLog(user){
        this.props.firebase.database().ref(
            'users/'
            + user.uid
            + '/conversations/'
            + this.state.conversationId
            + '/thread'
        ).orderByChild("created").once("value", function (chatlog) {
            // this.setState({chatlog: chatlog.val()});
            var mergedarray = [];
            var retrievedlogs = chatlog.val();
            for (var key in retrievedlogs) {
                mergedarray.push(retrievedlogs[key]);
            }
            this.setState({ chatlog: mergedarray })
            console.log(mergedarray);
        }.bind(this))
    }

    addMessage = (databody) => {
        // add the message to the chatlog
        this.setState((prevState) => ({
            chatlog: [...prevState.chatlog,
            {
                email: databody.email,
                content: databody.content
            }]
        }), () => {
            // clear message input box after adding new message to chatlog
            ReactDOM.findDOMNode(this.refs.message).value = "";
        });
    }

    submitMessage = (eh) => {
        // prevent web page refresh
        eh.preventDefault();
        console.log(this.state)
        const userMessage = ReactDOM.findDOMNode(this.refs.message).value;
        if (userMessage.trim() === "") {
            console.log("empty input");
        } else {
            var d = new Date();
            let databody = {
                "senderID": this.props.user.uid,
                "senderName": this.props.user.email,
                "content": userMessage,
                "created": d.getTime(),
            };
            this.addMessage(databody);

            // send the message to the backend
            /*
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(databody)
            };
            console.log(requestOptions);
            fetch('/test_api', requestOptions)
                .then(response => response.json())
                .then(data => this.addMessage({ "user": "Bot", "message": data.message }));
                */
            // store the message to Firebase
            this.props.firebase.database().ref('users/'
                + this.props.user.uid
                + '/conversations/'
                + this.state.conversationId
                + '/thread/'
            ).push(databody);
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
                                email={this.state.email}
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