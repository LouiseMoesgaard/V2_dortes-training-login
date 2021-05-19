import React from 'react';

import './message.scss';

function Message({message, user, callback, indent}){

    const formatTime = (time)=> {
        const date = new Date(time);
        return `${date.getDate()}/${date.getMonth()} ${date.getHours()}:${date.getMinutes()}`
    }

    return (
        <div className={`message ${indent? 'indent' : ''}`} onClick={()=>callback?callback(message): null}>
            <p>{user.username}</p>
            <p>{message.content}</p>
            <p>{formatTime(message.timestamp)}</p>
        </div>
    )
}

export default Message;