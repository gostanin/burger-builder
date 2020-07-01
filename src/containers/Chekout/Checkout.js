import React, { Component } from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';


class Checkout extends Component {

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
                ingredients={this.props.ingredients}
                checkContinue={this.checkoutContinued}
                checkCancel={this.checkoutCancelled}/>
                <Route path={this.props.match.url + '/contact-data'} render={(props) => (<ContactData ingredients={this.props.ingredients} totalPrice={this.props.totalPrice} {...props}/>)} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    }
}

export default connect(mapStateToProps)(Checkout);