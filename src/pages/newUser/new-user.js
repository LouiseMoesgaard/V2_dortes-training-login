import React from 'react';
import Button from '../../components/button/button';
import Modal from '../../components/modal/modal';
import AuthService from '../../services/auth';

import './new-user.scss';

function NewUser({user, uid, email}) {
    const [userName, setUserName] = React.useState('');
    React.useEffect(()=>{
        console.log(user)
        if(user) {
            window.location.href = '/kategorier';
        }
    })

    const onSubmit = (e)=>{
        e.preventDefault();
        if(userName) {
            AuthService.getDatabase().ref('users').push({username: userName, email: email, uid: uid});
        }
    }

    return (
        <div className="newUserPage">
            <Modal visible={true} title="Ny bruger" onClose={()=>{AuthService.doSignOut()}}>
                <p>Velkommen til Yoga Dorte's online platform.<br/> For at kunne forsætte beder vi dig skrive et brugernavn</p>
                <form onSubmit={e=>onSubmit(e)}>
                    <label htmlFor="username">
                        Brugernavn
                        <input name="username" type="text" value={userName} onChange={e=>setUserName(e.target.value)}/>
                    </label>
                    
                    <Button type="submit" value="Gem ændringer" />
                </form>
            </Modal>
        </div>
    )
}

export default NewUser;