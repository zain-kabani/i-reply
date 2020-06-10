import React from 'react';

const ChatMessage = ({chatitem, userId}) => (
    // classify as right aligned if this is the user
    <li className={"message " + (userId === chatitem.senderID + '' ? "right" : "left")}>
        <p>{chatitem.content}</p>
    </li>
);

export default ChatMessage;