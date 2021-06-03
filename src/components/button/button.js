import React from 'react';
import './button.scss';


function Button(props) {

    return(

        <button 
            type={props.type? props.type : 'button'} 
            className={props.className? props.className : 'base'} 
            onClick={props.onClick}
            disabled={props.disabled}
            tabIndex={props.tabIndex}>
            {!props.icon? <span>{props.value}</span>: <img src={props.icon} alt="button icon"></img>}
            {props.className === 'item'? <div className="triangle"></div> : null}
        </button>
        )
}

export default Button;
