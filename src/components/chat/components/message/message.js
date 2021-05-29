import React from 'react';

import './message.scss';

function Message({message, user, callback, indent}){

    const formatTime = (time)=> {
        const date = new Date(time);
        return `${date.getDate()}/${date.getMonth()} ${date.getHours()}:${date.getMinutes()}`
    }

    return (
        <div className={`message ${indent? 'indent' : ''}`} onClick={()=>callback?callback(message): null}>
            <p className="userName">
                <svg height="15" width="15">
                    <circle cx="7" cy="8" r="5" stroke-width="1" />
                </svg>
                {user.username}
            </p>
            <p className="messageContent">{message.content}</p>
            <p className="time">{formatTime(message.timestamp)}</p>
        </div>
    )
}

export default Message;