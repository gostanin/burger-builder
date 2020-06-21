import React from 'react';
import styles from './Navigationitem.module.css';

import { NavLink } from 'react-router-dom';

const navigationItem = (props) => (
    <li className={styles.NavigationItem}>
        <NavLink
            activeClassName={styles.active}
            to={props.link} exact={props.exact}
            >{props.children}</NavLink>
    </li>
);

export default navigationItem;