
import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import Button from '../button/button';
import './navigation.scss';

function Navigation(props) {
    const [menuHidden, setmenuHidden] = useState(true);

    return (
        <nav className={props.color? props.color: 'nav-green'}>     
                <div className="logo">
                    
                </div>

        
                <div className={`burger ${props.burgerColor? props.burgerColor: 'burger-white'} ${menuHidden? '' : 'close'}`} onClick={()=>setmenuHidden(!menuHidden)}>
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                </div>


                <div className={`menu ${menuHidden ? "hide" : ""}`}>
                        <Link to="/" className="active">Kategorioversigt</Link>
                        <Link>Gemte øvelser</Link>
                        <Button className="link" value="Log ud"/>
                        <Button className="link"></Button>
                </div>
        </nav>
    )


  }

  export default Navigation;