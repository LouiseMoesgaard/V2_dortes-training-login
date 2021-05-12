import React from 'react';
import { useHistory } from "react-router-dom";
import Header from '../../components/header/header'

import './login.scss'


function Login() {
    const history = useHistory()

    const handleSubmit = (event) => {
        event.preventDefault();
        window.authService.doSignInWithEmailAndPassword(event.target['userName'].value, event.target['password'].value)
        .then(()=>{
            history.push('/home');
        })


      }

return(

    <div id="login">

        <Header title="Log ind"/>
        <p> 
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Nam tempor egestas mi vitae tempor. Nulla vitae massa iaculis, fringilla felis eu, convallis erat.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tempor egestas mi vitae tempor. 
            Nulla vitae massa iaculis, fringilla felis eu, convallis erat. 
        </p>

        <form onSubmit={handleSubmit}>
            <label htmlFor="userName">Brugernavn
            <input type="text" id="userName" name="userName"/>
            </label>

            <label htmlFor="password">Password
            <input type="password" id="password" name="password"/>
            </label>

            <input type="submit" value="Log ind"/>

            <p className="lostPassword"> Glemt kodeord?
            <a href=""> Klik her</a>
        </p>
        </form> 

    </div>


    )
}

export default Login;
