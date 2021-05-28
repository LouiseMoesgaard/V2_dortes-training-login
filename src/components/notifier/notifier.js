import React from 'react';

import './notifier.scss';

function Notifier({notice, direction, duration}){
    const [className, setClassName] = React.useState('notifyIn isIn');

    const outro = ()=>{
            setTimeout(()=>setClassName('notifyOut isOut'), duration? duration: 3000);
    }

    return (
        <span className={`notifier ${className} ${direction? direction: 'right'}`} onAnimationEnd={()=>outro()}>{notice}</span> : null
    )

}

export default Notifier;