import React from 'react';


function Header(props) {

return(

    <div className="header">
        { 
        !props.type && <h1> {props.title.toUpperCase()}</h1>
        }

        { 
        props.type === 2 && <h2> {props.title.toUpperCase()}</h2>
        }

        { 
        props.type === 3 && <h3> {props.title.toUpperCase()}</h3>
        }

    </div>
    )
}

export default Header;
