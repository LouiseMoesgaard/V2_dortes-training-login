import React from 'react';
import Header from '../header/header'
import Icon from '../icon/icon'
import FocusTrap from 'focus-trap-react';

import './modal.scss'

function Modal (props) {
    const [trap, setTrap] = React.useState(true);

    return (
        props.visible?
        <FocusTrap active={props.visible}>
            <div className="ModalWrapper" onClick={()=>props.onClose()}>
            <div className="Modal" onClick={e=>e.stopPropagation()}>
                <div className="ModalHeader" onClick={e=>e.stopPropagation()}>
                <Header title={props.title}></Header>
                <Icon icon="close" onClick={()=>props.onClose()}></Icon>

                </div>
                <div className="ModalBody"  onClick={e=>e.stopPropagation()}>
                    {props.children}
                </div>
                <div className="ModalFooter"  onClick={e=>e.stopPropagation()}></div>
            </div>
        </div>
        </FocusTrap> : null
    )
}

export default Modal;