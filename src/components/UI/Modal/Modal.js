import React from 'react';
import styles from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

const Modal = props => {
    return (
    <React.Fragment>
        <Backdrop show={props.show} onClick={props.orderClick}/>
        <div 
            className={styles.Modal}
            style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0'
            }}   
        >
            {props.children}
        </div>
    </React.Fragment>);
}

export default React.memo(Modal, (prevProps, nextProps) => {
    return nextProps.show === prevProps.show && nextProps.children === prevProps.children
});