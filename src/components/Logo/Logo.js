import React from 'react';
import logoImg from '../../assets/original.png';
import styles from './Logo.module.css';

const logo = (props) => (
    <div className={styles.Logo}>
        <img src={logoImg} alt="LOGO"/>
    </div>
);

export default logo