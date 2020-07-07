import React, { useState } from 'react';
import styles from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux';


const Layout = props => {
    const [drawerState, setDrawer] = useState(false)
 
    const sideDrawerToggle = () => {
        setDrawer(!drawerState)
    }

    return (
        <React.Fragment>
            <Toolbar isAuth={props.isAuth} active={drawerState} toggle={sideDrawerToggle} />
            <SideDrawer isAuth={props.isAuth} open={drawerState} closed={sideDrawerToggle}/>
            <main className={styles.Content}>
                {props.children}
            </main>  
        </React.Fragment>
    );
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token != null
    }
}

export default connect(mapStateToProps)(Layout);