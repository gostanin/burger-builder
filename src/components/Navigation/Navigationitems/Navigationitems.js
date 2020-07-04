import React from 'react';
import styles from './Navigationitems.module.css';
import NavigationItem from './Navigationitem/Navigationitem';

const navigationItems = (props) => (
    <ul className={styles.NavigationItems}>
        <NavigationItem link="/" exact>Burger Builder</NavigationItem>
        { props.isAuth ? <NavigationItem link="/orders">Orders</NavigationItem> : null }
        { !props.isAuth 
            ? <NavigationItem link="/auth">Auth</NavigationItem>
            : <NavigationItem link="/logout">Logout</NavigationItem>}
    </ul>
);

export default navigationItems;