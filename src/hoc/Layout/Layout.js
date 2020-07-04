import React, { Component } from 'react';
import styles from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux';


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
                <Toolbar isAuth={this.props.isAuth} active={this.state.showSideDrawer} toggle={this.sideDrawerToggle} />
                <SideDrawer isAuth={this.props.isAuth} open={this.state.showSideDrawer} closed={this.sideDrawerToggle}/>
                <main className={styles.Content}>
                    {this.props.children}
                </main>  
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token != null
    }
}

export default connect(mapStateToProps)(Layout);