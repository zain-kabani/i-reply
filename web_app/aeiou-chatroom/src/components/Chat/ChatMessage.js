import React from 'react';

import '../../constants/styles.css';

const ChatMessage = ({chatitem, email}) => (
    // classify as right aligned if this is the user
    <li className={"message " + (email === chatitem.email ? "right" : "left")}>
        <p>{chatitem.content}</p>
    </li>
);

export default ChatMessage;