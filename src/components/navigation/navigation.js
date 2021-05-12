
import React, { useState } from 'react';

import './navigation.scss';

function Navigation(props) {
    const [menuHidden, setmenuHidden] = useState(true);

    return (
        <nav className={props.color? props.color: 'nav-green'}>     
                <div className="logo">
                    
                </div>

        
                <div className={`burger ${props.burgerColor? props.burgerColor: 'burger-white'}`} onClick={()=>setmenuHidden(!menuHidden)}>
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                </div>


                <div className={`menu ${menuHidden ? "hide" : ""}`}>
                        <a className="active">Kategorioversigt</a>
                        <a>Gemte øvelser</a>
                        <a>Log ud</a>
                        <div className="settings"></div>
                </div>
        </nav>
    )


  }

  export default Navigation;