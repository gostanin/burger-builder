import React from 'react';
import Button from '../../UI/Button/Button';

const OrderSummary = props => {
    const ingredientSummary = Object.entries(props.ingredients).map(el => {
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
        <p><strong>TotalPrice: {props.price.toFixed(2)}</strong></p>
        <p>Continue to Checkout?</p>
        <Button btnType="Danger" clicked={props.cancel}>Cancel</Button>
        <Button btnType="Success" clicked={props.continue}>Continue</Button>
    </React.Fragment>);
}

export default OrderSummary;