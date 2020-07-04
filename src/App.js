import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Chekout/Checkout';
import Orders from './containers/Order/Orders';
import { Route, withRouter, Redirect } from 'react-router-dom';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import {connect} from 'react-redux';
import * as actions from './store/actions/index';


class App extends Component {
  componentDidMount () {
    console.log('dispatching')
    this.props.onTryAutoSign()
  }
  
  render () {
    console.log(this.props)
    let routes = (
      <Layout>
          <Route path='/' exact component={BurgerBuilder} />
          <Route path='/auth' component={Auth} />
          <Redirect to='/'/>
        </Layout>
    );

    if (this.props.isAuth) {
      routes = (
        <Layout>
            <Route path='/' exact component={BurgerBuilder} />
            <Route path='/orders' component={Orders} />
            <Route path='/checkout' component={Checkout} />
            <Route path='/logout' component={Logout} />
            <Route path='/auth' component={Auth} />
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
