import React from 'react';
import styles from './BurgerButton.module.css';

const burgerButton = (props) => {
    let hamburgerStyles = [styles.hamburger, styles['hamburger--squeeze']];

    if (props.active) {
        hamburgerStyles.push(styles['is-active'])
    }

    return (
        <div className={hamburgerStyles.join(' ')}>
            <div className={styles['hamburger-box']}>
                <div className={styles['hamburger-inner']}></div>
            </div>
        </div>
    );
}

export default burgerButton;