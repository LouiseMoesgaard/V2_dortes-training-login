import React, {useState} from 'react';
import { useHistory } from "react-router-dom";
import Header from '../../components/header/header'
import Modal from '../../components/modal/modal';
import Button from '../../components/button/button';

import './login.scss'


function Login() {
    const history = useHistory()
    const [showReset, setShowReset] = useState(false);
    const [loginError, setLoginError] = useState(false);
    const [resetError, setResetError] = useState(false);

    React.useEffect(()=>console.log(showReset))

    const handleSubmit = (event) => {
        event.preventDefault();
        window.authService.doSignInWithEmailAndPassword(event.target['email'].value, event.target['password'].value)
        .then(()=>{
            setLoginError(false);
            history.push('/home');
        }, ()=>{
            setLoginError(true);
        })
    }

    const resetPassword = (event) => {
        event.preventDefault();
        window.authService.doPasswordReset(event.target['email'].value).then(()=>{
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

    <div id="login">

        <Header title="Log ind"/>
        <div className="bluebox">

            <p> 
                Log ind og få adgang til din personlige favorittræning og gør det hurtigt og nemt for dig, at træne på DIN måde!
                Spar på stressen og den travle hverdag og vælg selv hvor og hvornår. 
                <br/> 
                <br/> 
                Herinde finder du bl.a:
            </p>

            <ul>
                <li>
                Kategorier og øvelser til enhver smag
                </li>
                <li>
                Yoga- og træningsvideoer på varierende tider.
                </li>
                <li>
                mulighed for at gemme dine ynglingsøvelser
                </li>
            </ul>

        </div>
        <form onSubmit={handleSubmit}>
        {
            loginError? <p className="alert">E-mail eller password er forkert.</p>: null
        }
            <label htmlFor="email">E-mail
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
                <p>Indtast din e-mail herunder, så sender vi dig et link til at nustille dit password</p>
                <form onSubmit={resetPassword}>
                    {
                    resetError? <p className="alert">Der er ingen brugere koblet til denne email. Kontakt din arbejsplads for yderligere vejledning.</p>: null
                    }
                    <label htmlFor="email">E-mail
                        <input type="email" name="email" placeholder="example@gmail.com" required={true} tabIndex="1"/>
                    </label>
                    <Button type="submit" value="send" tabIndex="1"/>
                </form>
            </Modal>
    </div>


    )
}

export default Login;
