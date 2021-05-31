import React from 'react';
import AuthService from '../../services/auth';
import Button from '../button/button';

import './settings.scss';

function Settings({onSave}){

    const [user, setUser] = React.useState(null);
    const [error, setError] = React.useState(null);
    const [newEmail, setNewEmail] = React.useState(null);
    const [newPassword, setNewPassword] = React.useState(null);
    const [verifyNewPassword, setVerifyNewPassword] = React.useState(null);

    React.useEffect(()=>{
        AuthService.getDatabase().ref('users').orderByChild("uid").equalTo(AuthService.currentUser().uid)
        .once("value", (snapshot)=>{
            let user;
            snapshot.forEach(function(snap) {
                user = {
                    id: snap.key,
                    ...snap.val()
                };
                setUser(user)
            });
            
        })
    }, [])

    const saveData = (e)=> {
        e.preventDefault();
        if(newPassword === verifyNewPassword) {
            try {
            AuthService.currentUser().updatePassword(newPassword);
            } catch(error) {
                setError(error);
            }
        } else {
            setError("Password skal matche")
        }
        if(newEmail === user.email) {
            try {
            AuthService.currentUser().updateEmail(user.email);
            } catch(error) {
                setError(error);
            }
        }
        AuthService.getDatabase().ref(`users/${user.id}`).set(user);
        onSave();
    }

    return (
        user?
        <form className="userSettings" onSubmit={saveData}>
            <label htmlFor="username">Brugernavn
                <input type="text" name="username" value={user.username} onChange={(e)=>setUser({...user, username: e.target.value})}/>
            </label>
            <label htmlFor="email">Email
                <input type="email" name="email" value={user.email} onChange={(e)=>{setUser({...user, email: e.target.value}); setNewEmail(e.target.value)}}/>
            </label>
            <label htmlFor="password">Nyt password
                <input type="password" name="password" onChange={(e)=>setNewPassword(e.target.value)}/>
            </label>
            {
                newPassword?
                <label htmlFor="verifyPassword">Gentag password
                    <input type="password" name="verifyPassword" onChange={e=>setVerifyNewPassword(e.target.value)}/>
                </label>: null
            }

            <Button type="submit" value="Gem"></Button>

        </form>: null
    )
}

export default Settings;