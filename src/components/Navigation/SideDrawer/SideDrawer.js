import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from './../Navigationitems/Navigationitems';
import styles from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {
    let attachedClasses = [styles.SideDrawer, styles.Close];
    if (props.open) {
        attachedClasses = [styles.SideDrawer, styles.Open];
    }
    
    return (
        <React.Fragment>
            <Backdrop show={props.open} onClick={props.closed}/>
            <div className={attachedClasses.join(' ')}>
                <div className={styles.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuth={props.isAuth}/>
                </nav>
            </div>
        </React.Fragment>
    );
};

export default sideDrawer;