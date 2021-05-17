import React from 'react';
import ICON from '../../constants/icon';

import './icon.scss';


function Icon (props) {
    
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
          props.onClick(e);
        }
      }

    return (
        <span className={`icon ${props.icon}`} onClick={(e)=>props.onClick(e)} onKeyDown={(e)=>handleKeyDown(e)} tabIndex="1">
            <img src={ICON[props.icon].icon} alt={ICON[props.icon].alt}></img>
        </span>

    )
}

export default Icon;