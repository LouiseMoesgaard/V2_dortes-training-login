import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../button/button';

import './breadcrumbs.scss';

function Breadcrumbs({routes}) {
    return (
        <div className="breadCrumbs">
            {
                routes.map((route,i)=>
                <div key={i}>
                    <Link to={route.href}>
                        <Button className="link" value={route.name} disabled={i === routes.length-1}></Button>
                    </Link>
                    { i < routes.length-1?
                        <svg xmlns="http://www.w3.org/2000/svg">
                            <polygon points="0,0 10,5 0,10"/>
                        </svg> : null
                    }
                    
                </div>
                )
            }
        </div>
    )
}


export default Breadcrumbs