import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { Route, withRouter, Redirect } from 'react-router-dom';
import Logout from './containers/Auth/Logout/Logout';
import {connect} from 'react-redux';
import * as actions from './store/actions/index';
import asyncComponent from './hoc/asycComponent/asycComponent';

const asyncCheckout = asyncComponent(() => {
  return import('./containers/Chekout/Checkout')
})

const asyncOrders = asyncComponent(() => {
  return import('./containers/Order/Orders')
})

const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth')
})


class App extends Component {
  componentDidMount () {
    this.props.onTryAutoSign()
  }
  
  render () {
    let routes = (
      <Layout>
          <Route path='/' exact component={BurgerBuilder} />
          <Route path='/auth' component={asyncAuth} />
          <Redirect to='/'/>
        </Layout>
    );

    if (this.props.isAuth) {
      routes = (
        <Layout>
            <Route path='/' exact component={BurgerBuilder} />
            <Route path='/orders' component={asyncOrders} />
            <Route path='/checkout' component={asyncCheckout} />
            <Route path='/logout' component={Logout} />
            <Route path='/auth' component={asyncAuth} />
            <Redirect to='/' />
          </Layout>
      );
    }

    return (
      <div>
        {routes}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSign: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
