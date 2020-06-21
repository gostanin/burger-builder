import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import styles from './CheckoutSummary.module.css';

const CheckoutSummary = (props) => {
    
    return (
        <div className={styles.CheckoutSummary}>
            <h1>We hope it tastes well!</h1>
            <Burger ingredients={props.ingredients} />
            <Button btnType='Danger' clicked={props.checkCancel}>Cancel</Button>
            <Button btnType='Success' clicked={props.checkContinue}>Continue</Button>
        </div>
    )
}

export default CheckoutSummary;