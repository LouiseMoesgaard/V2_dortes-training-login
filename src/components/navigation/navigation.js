
import React, { useState, useEffect } from 'react';
import {NavLink} from 'react-router-dom';
import Button from '../button/button';
import Modal from '../../components/modal/modal';
import AuthService from '../../services/auth';

import gear from '../../medier/icons/gear.png';
import './navigation.scss';
import Settings from '../settings/settings';
import Responsiveness from '../../services/responsiveness';

function Navigation(props) {
    const [menuHidden, setmenuHidden] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);

    useEffect(()=>{
        setMobile();
        window.addEventListener("resize",setMobile);
        return function cleanup() {
            window.removeEventListener('resize', setMobile);
          };
    }, [])

    const setMobile = ()=> {
        setIsMobile(Responsiveness.isMobile())
    }

    const signOut = ()=>{
        AuthService.doSignOut(); 
        window.location.href = '/';
    }



    return (
        <nav className={`${isMobile? 'nav-green' : 'nav-white'}`}>     
                <div className="logo">
                </div>

                { isMobile?
                <div className={`burger ${props.burgerColor? props.burgerColor: 'burger-white'} ${menuHidden? '' : 'close'}`} onClick={()=>setmenuHidden(!menuHidden)}>
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                </div> : null
                }


                <div className={`menu ${menuHidden && isMobile ? "hide" : ""} ${!isMobile? 'desktop' : ''}`}>
                        <NavLink to="/categories" activeClassName="active">Kategorioversigt</NavLink>
                        <NavLink to="/saved" activeClassName="active">Gemte øvelser</NavLink>
                        <Button className="link" value="Log ud" onClick={()=>signOut()}/>
                        <Button className="icon" icon={gear} onClick={()=>setSettingsOpen(true)}></Button>
                </div>

                <Modal visible={settingsOpen} onClose={()=>setSettingsOpen(false)} title="Indstillinger"><Settings onSave={()=>setSettingsOpen(false)}></Settings></Modal>
        </nav>
    )


  }

  export default Navigation;