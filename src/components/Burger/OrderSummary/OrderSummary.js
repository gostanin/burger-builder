import React, { Component } from 'react';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    // For testing. Could be turn back into functional component
    componentWillUpdate() {
        console.log('[OrderSummary] Will updates')
    }

    render () {
        const ingredientSummary = Object.entries(this.props.ingredients).map(el => {
            let name = null;
            let count = null;
            [name, count] = el;
            return (
            <li key={name}><span style={{textTransform: 'capitalize'}}>{name}</span>: {count}</li>
            )
        })

        return (<React.Fragment>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>TotalPrice: {this.props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={this.props.cancel}>Cancel</Button>
            <Button btnType="Success" clicked={this.props.continue}>Continue</Button>
        </React.Fragment>);
    }
}

export default OrderSummary;