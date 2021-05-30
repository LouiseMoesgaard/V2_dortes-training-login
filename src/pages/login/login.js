import React, {useState} from 'react';
import { useHistory } from "react-router-dom";
import Header from '../../components/header/header'
import Modal from '../../components/modal/modal';
import Button from '../../components/button/button';
import Wordpress from '../../services/wordpress';
import AuthService from '../../services/auth';
import './login.scss'


function Login() {
    const history = useHistory()
    const [showReset, setShowReset] = useState(false);
    const [loginError, setLoginError] = useState(false);
    const [resetError, setResetError] = useState(false);
    const [post, setPost] = useState(null);
    

    React.useEffect(()=>{
        Wordpress.getpost(417).then((post)=>{
            setPost(post);
        });
        
    },[])

    const handleSubmit = (event) => {
        event.preventDefault();
        AuthService.doSignInWithEmailAndPassword(event.target['email'].value, event.target['password'].value)
        .then(()=>{
            setLoginError(false);
            history.push('/new-user');
        }, ()=>{
            setLoginError(true);
        })
    }

    const resetPassword = (event) => {
        event.preventDefault();
        AuthService.doPasswordReset(event.target['email'].value).then(()=>{
            setShowReset(false);
        }, ()=>{
            setResetError(true);
        });
        
    }

    const closeModal = () => {
        setShowReset(false)
        setResetError(false)
    }


return(
    post?
    <div id="login">

        <Header title="Log ind"/>
        <div className="bluebox" dangerouslySetInnerHTML={ { __html: post.tekst } }></div>
        
        <form onSubmit={handleSubmit}>
        {
            loginError? <p className="alert">Email eller password er forkert.</p>: null
        }
            <label htmlFor="email">Email
            <input type="email" id="email" name="email" placeholder="example@gmail.com"/>
            </label>

            <label htmlFor="password">Password
            <input type="password" id="password" name="password"/>
            </label>

            <Button type="submit" value="Log ind"/>

            <p className="lostPassword"> Glemt kodeord?
                <Button className="link" onClick={(e)=>setShowReset(true)} value="Klik her"/>
            </p>
        </form> 
            <Modal visible={showReset} onClose={closeModal} title="nulstil password?">
                <p>Indtast din email herunder, så sender vi dig et link til at nustille dit password</p>
                <form onSubmit={resetPassword}>
                    {
                    resetError? <p className="alert">Der er ingen brugere koblet til denne email. Kontakt din arbejsplads for yderligere vejledning.</p>: null
                    }
                    <label htmlFor="email">Email
                        <input type="email" name="email" placeholder="example@gmail.com" required={true} tabIndex="1"/>
                    </label>
                    <Button type="submit" value="send" tabIndex="1"/>
                </form>
            </Modal>
    </div>: null
    )
}

export default Login;
