import React, { Component } from 'react';
import styles from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';


class Layout extends Component {
    state = {
        showSideDrawer: false
    }
    
    sideDrawerToggle = () => {
        this.setState((prevState) => 
        {
            return {showSideDrawer: !prevState.showSideDrawer};
        
        });
    }

    render () {
        return (
            <React.Fragment>
                <Toolbar active={this.state.showSideDrawer} toggle={this.sideDrawerToggle} />
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerToggle}/>
                <main className={styles.Content}>
                    {this.props.children}
                </main>  
            </React.Fragment>
        );
    }
}

export default Layout;