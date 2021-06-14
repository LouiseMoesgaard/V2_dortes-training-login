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
        const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
        if(newPassword === verifyNewPassword) {
            if(passwordRegex.match(newPassword)) {
                try {
                    AuthService.currentUser().updatePassword(newPassword);
                    } catch(error) {
                        setError(error);
                        return;
                    }

            } else {
                setError("Password overholder ikke format");
                return;
            }
        } else {
            setError("Password skal matche")
            return;
        }
        if(user.username=== ""){
            setError("Du skal skrive et brugernavn");
            return;
        } 
        let usernameExists = false;
        AuthService.getDatabase().ref('users').on('value', (snapshot)=>{
            snapshot.forEach(snap =>{
                if(snap.val().username === user.username && snap.val().uid !== user.uid){
                    usernameExists = true;
                }
            })
        })

        if(usernameExists){
            setError("Brugernavnet findes allerede");
            return;
        }

        if(newEmail === user.email) {
            try {
            AuthService.currentUser().updateEmail(user.email);
            } catch(error) {
                setError(error);
                return;
            }
        }
        AuthService.getDatabase().ref(`users/${user.id}`).set(user);
        onSave();
    }

    return (
        user?
        <form className="userSettings" onSubmit={saveData}>
            <label htmlFor="username">Brugernavn
                <p class="helpText"> Brugernavn skal være 8 tegn eller under</p>
                <input type="text" name="username" value={user.username} onChange={(e)=>setUser({...user, username: e.target.value})} maxLength="8"/>
            </label>
            <label htmlFor="email">Email
                <input type="email" name="email" value={user.email} onChange={(e)=>{setUser({...user, email: e.target.value}); setNewEmail(e.target.value)}}/>
            </label>
            <label htmlFor="password">Nyt password
            <p class="helpText"> Skal indeholde 8 karakter, med mindst 1 tal, 1 stort bogstav og 1 lille bogstav</p>
                <input type="password" name="password" onChange={(e)=>setNewPassword(e.target.value)}/>
            </label>
            {
                newPassword?
                <label htmlFor="verifyPassword">Gentag password
                    <input type="password" name="verifyPassword" onChange={e=>setVerifyNewPassword(e.target.value)}/>
                </label>: null
            }

            { error? <p class="alert">{error}</p>:null}

            <Button type="submit" className={`base ${error? '': 'buttonMargin'}`} value="Gem"></Button>

        </form>: null
    )
}

export default Settings;