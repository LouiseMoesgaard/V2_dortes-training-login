import React from 'react';
import Message from './components/message/message';
import AuthService from '../../services/auth';

import './chat.scss';
import Button from '../button/button';
import Icon from '../icon/icon';

function Chat() {
    const [user, setUser] = React.useState(AuthService.currentUser());
    const [content, setContent] = React.useState("");
    const [messages, setMessages] = React.useState([]);
    const [users, setUsers] = React.useState([]);
    const [reply, setReply] = React.useState(false);
    const [replyTo, setReplyTo] = React.useState(null);
    const [replies, setReplies] = React.useState([]);

    React.useEffect(()=>{
        AuthService.getDatabase().ref("users").on("value", snapshot => {
            let users = [];
            snapshot.forEach((snap) => {
              users.push(snap.val());
            });
            setUsers(users);
          });
        AuthService.getDatabase().ref("chats").on("value", snapshot => {
            let chats = [];
            let replies = [];
            snapshot.forEach((snap) => {
                if(snap.val().replyTo){
                    replies.push(snap.val());
                } else {
                    chats.push(snap.val());
                }
            });
            setMessages(chats);
            setReplies(replies);
          });
    }, []);

    const handleSubmit = (event)=>{
        event.preventDefault();
        const m = {
            content: content, 
            timestamp: Date.now(), 
            uid: user.uid
        };
        if(reply){
            m.replyTo = replyTo.timestamp;
        }
        AuthService.getDatabase().ref('chats').push(m).then(()=>{
            setContent("");
            setReply(false);
            setReplyTo(null);
        });
    }

    const handleChange = (event)=>{
        setContent(event.target.value);
    }

    const getUser = (uid)=>{
        return users.find(user=>user.uid === uid);
    }

    const handleReply = (message)=> {
        setReply(true);
        setReplyTo(message);
    }
    const getReplies = (timestamp) => {
        return replies.filter(reply => reply.replyTo === timestamp);
    }

    return(
        <div className="chat">
            <div className="messageBox">
                {
                    messages.map((message, i)=>
                    <div className="messageWrapper">
                            <Message 
                                message={message} 
                                user={getUser(message.uid)}
                                callback={handleReply}
                                key={i} />

                                {
                                    getReplies(message.timestamp).map((reply, j) => 
                                            <Message
                                                message={reply}
                                                user={getUser(reply.uid)}
                                                indent={true}
                                                key={j}
                                            />
    
                                    )
                                }
                                { replyTo && replyTo.timestamp === message.timestamp ?
                                <>
                                    <form onSubmit={handleSubmit}>
                                    <input type="text" onChange={handleChange} value={content}></input>
                                    <Button type="submit" value="Send"/>
                                </form>
                                </> : null
                                }
                                
                    </div>
                    )
                    
                }
            </div>
            { !reply?
            <form onSubmit={handleSubmit}>
                <input type="text" onChange={handleChange} value={content}></input>
                <Button type="submit" value="Send"/>
            </form>: null
            }
        </div>


    )
}

export default Chat;