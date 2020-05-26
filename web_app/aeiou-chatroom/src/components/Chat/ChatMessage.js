import React from 'react';

import '../../constants/styles.css';

const ChatMessage = ({chatitem, username}) => (
    // classify as right aligned if this is the user
    <li className={"message " + (username === chatitem.user ? "right" : "left")}>
        {chatitem.message}
    </li>
);

export default ChatMessage;