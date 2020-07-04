import React from 'react';
import styles from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../Navigationitems/Navigationitems';
import BurgerButton from '../SideDrawer/BurgerButton/BurgerButton';

const toolbar = (props) => { 
    return (
        <header className={styles.Toolbar}>
            <span className={styles.HamburgerShow} onClick={props.toggle}>
                <BurgerButton active={props.active}/>
            </span>
            <div className={styles.Logo}>
                <Logo />
            </div>
            <nav className={styles.DesktopOnly}>
                <NavigationItems isAuth={props.isAuth}/>
            </nav>
        </header>
    );
}

export default toolbar;