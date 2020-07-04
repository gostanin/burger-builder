import React, { Component } from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
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
        let summary = <Redirect to='/'/>
        if (this.props.ingredients) {
            const puchasedRedirect = this.props.purchased ? <Redirect to='/' /> : null
            summary = (
            <div>
                {puchasedRedirect}
                <CheckoutSummary 
                ingredients={this.props.ingredients}
                checkContinue={this.checkoutContinued}
                checkCancel={this.checkoutCancelled}/>
                <Route path={this.props.match.url + '/contact-data'} render={(props) => (<ContactData ingredients={this.props.ingredients} totalPrice={this.props.totalPrice} {...props}/>)} />
            </div>
            );
        }
        return summary;
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);