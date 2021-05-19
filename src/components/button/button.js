import React from 'react';
import './button.scss';


function Button(props) {

    return(

        <button 
            type={props.type? props.type : 'button'} 
            className={props.className? props.className : 'base'} 
            onClick={props.onClick}
            tabIndex={props.tabIndex}>
            {!props.icon? props.value: <img src={props.icon}></img>}
        </button>
        )
}

export default Button;
