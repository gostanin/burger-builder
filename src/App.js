import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Chekout/Checkout';
import Orders from './containers/Order/Orders';
import { Route } from 'react-router-dom';


class App extends Component {
  render () {
    return (
      <div>
        <Layout>
          <Route path='/' exact component={BurgerBuilder} />
          <Route path='/orders' component={Orders} />
          <Route path='/checkout' component={Checkout} />
        </Layout>
      </div>
    );
  }
}

export default App;
