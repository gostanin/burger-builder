import React, { Component } from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';


class Checkout extends Component {
    state = {
        ingredients: {...this.props.location.state.ingredients},
        totalPrice: this.props.location.state.totalPrice
    }

    componentDidMount () {
        this.setState({ingredients: this.props.location.state.ingredients})
    }

    checkoutCancelled = () => {
        this.props.history.goBack();
    }

    checkoutContinued = () => {
        // console.log(this.props.match.url + '/contact-data')
        this.props.history.replace(this.props.match.url + '/contact-data');
    }

    render() {
        return (
            <div>
                <CheckoutSummary 
                ingredients={this.state.ingredients}
                checkContinue={this.checkoutContinued}
                checkCancel={this.checkoutCancelled}/>
                <Route path={this.props.match.url + '/contact-data'} render={(props) => (<ContactData ingredients={this.state.ingredients} totalPrice={this.state.totalPrice} {...props}/>)} />
            </div>
        );
    }
}

export default Checkout;