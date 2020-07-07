import React from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';

const Checkout = props => {

    const checkoutCancelled = () => {
        props.history.goBack();
    }

    const checkoutContinued = () => {
        props.history.replace(props.match.url + '/contact-data');
    }

    let summary = <Redirect to='/'/>
    if (props.ingredients) {
        const puchasedRedirect = props.purchased ? <Redirect to='/' /> : null
        summary = (
        <div>
            {puchasedRedirect}
            <CheckoutSummary 
            ingredients={props.ingredients}
            checkContinue={checkoutContinued}
            checkCancel={checkoutCancelled}/>
            <Route path={props.match.url + '/contact-data'} render={(props) => (<ContactData ingredients={props.ingredients} totalPrice={props.totalPrice} {...props}/>)} />
        </div>
        );

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