import React from 'react';
import styles from './Navigationitems.module.css';
import NavigationItem from './Navigationitem/Navigationitem';

const navigationItems = (props) => (
    <ul className={styles.NavigationItems}>
        <NavigationItem link="/" active>Burger Builder</NavigationItem>
        <NavigationItem link="/">Checkout</NavigationItem>
    </ul>
);

export default navigationItems;