import React from 'react';

function Chat() {
    const [user, setUser] = React.useState(window.authService.auth.currentUser);
    const [content, setContent] = React.useState("");
    const [messages, setMessages] = React.useState(null);

    React.useEffect(()=>{
        window.authService.db.ref("chats").on("value", snapshot => {
            let chats = [];
            snapshot.forEach((snap) => {
              chats.push(snap.val());
            });
            setMessages(chats);
          });
    })

    return(



    )
}

export default Chat;