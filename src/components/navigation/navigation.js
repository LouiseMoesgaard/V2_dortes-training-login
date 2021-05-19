
import React, { useState, useEffect } from 'react';
import {NavLink} from 'react-router-dom';
import Button from '../button/button';
import Modal from '../../components/modal/modal';

import gear from '../../medier/icons/gear.png';
import './navigation.scss';

function Navigation(props) {
    const [menuHidden, setmenuHidden] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);

    useEffect(()=>{
        setIsMobile(detectMobile());
        window.addEventListener("resize", ()=> setIsMobile(detectMobile()));
    }, [])

    const detectMobile = () => {
        return ( ( window.innerWidth <= 800 ) && ( window.innerHeight <= 1024 ) );
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
                        <NavLink to="/categories" activeClassName="active">Forside</NavLink>
                        <NavLink to="/saved" activeClassName="active">Gemte øvelser</NavLink>
                        <Button className="link" value="Log ud" onClick={()=>window.authService.doSignOut()}/>
                        <Button className="icon" icon={gear} onClick={()=>setSettingsOpen(true)}></Button>
                </div>

                <Modal visible={settingsOpen} onClose={()=>setSettingsOpen(false)} title="Indstillinger"></Modal>
        </nav>
    )


  }

  export default Navigation;