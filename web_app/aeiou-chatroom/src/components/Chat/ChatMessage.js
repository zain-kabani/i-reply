import React from 'react';

const ChatMessage = ({chatitem, email}) => (
    // classify as right aligned if this is the user
    <li className={"message " + (email === chatitem.senderName ? "right" : "left")}>
        <p>{chatitem.content}</p>
    </li>
);

export default ChatMessage;