import React, { useEffect, Suspense } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { Route, withRouter, Redirect } from 'react-router-dom';
import Logout from './containers/Auth/Logout/Logout';
import {connect} from 'react-redux';
import * as actions from './store/actions/index';

const Checkout = React.lazy(() => {
  return import('./containers/Chekout/Checkout')
})

const Orders = React.lazy(() => {
  return import('./containers/Order/Orders')
})

const Auth = React.lazy(() => {
  return import('./containers/Auth/Auth')
})


const App = props => {
  useEffect(() => {
    props.onTryAutoSign();
  }, []);
  
  let routes = (
    <Layout>
        <Route path='/' exact component={BurgerBuilder} />
        <Route path='/auth' render={(props)=> <Auth {...props} />} />
        <Redirect to='/'/>
      </Layout>
  );

  if (props.isAuth) {
    routes = (
      <Layout>
          <Route path='/' exact component={BurgerBuilder} />
          <Route path='/orders' render={(props) => <Orders {...props} />} />
          <Route path='/checkout' render={(props) => <Checkout {...props} />} />
          <Route path='/logout' component={Logout} />
          <Route path='/auth' render={(props) => <Auth {...props} />} />
          <Redirect to='/' />
        </Layout>
    );
  }

  return (
    <div>
      <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
    </div>
  );
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
