import React, { useState, useEffect } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';


const BurgerBuilder = props => {
    const [purchasing, setPurchasing] = useState(false);

    useEffect(() => {
        props.initIngredients();
    }, [])
    
    const purchaseHandler = () => {
        if (props.isAuth) {
            setPurchasing(!purchasing);
        }
        else {
            props.onSetAuthREdirect('/checkout');
            props.history.push('/auth');
        }
    }

    const purchaseContinueHandler = () => {
        props.onInitPuchase();
        props.history.push('/checkout');
    }

    const updatePurchaseState = (ingredients) => {
        const sum = Object.values(ingredients).reduce((a, b) => a+b, 0);
        return sum > 0
    }

    const disabledInfo ={
        ...props.ingredients
    };
    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0
    }
    let orderSummary = null;
    let burger = props.error ? <p>Ingredients cannot be loaded</p> : <Spinner />;

    if (props.ingredients) {
        burger = (
            <React.Fragment>
            <Burger ingredients={props.ingredients}/>
            <BuildControls
                ingredientAdded={props.addIngredientHandler}    
                ingredientRemoved={props.removeIngredientHandler}
                disabled={disabledInfo}
                price={props.totalPrice}
                purchasebale={updatePurchaseState(props.ingredients)}
                orderClick={purchaseHandler}
                isAuth={props.isAuth}/>
            </React.Fragment>
        );

        orderSummary = <OrderSummary 
                        ingredients={props.ingredients}
                        continue={purchaseContinueHandler}
                        cancel={purchaseHandler}
                        price={props.totalPrice}/>
    }

    return (
        <React.Fragment>
            <Modal 
                show={purchasing}
                orderClick={purchaseHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </React.Fragment>
    );
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuth: state.auth.token != null
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addIngredientHandler: (ingName) => dispatch(actions.addIngredientHandler(ingName)),
        removeIngredientHandler: (ingName) => dispatch(actions.removeIngredientHandler(ingName)),
        initIngredients: () => dispatch(actions.initIngredients()),
        onInitPuchase: () => dispatch(actions.purchaseInit()),
        onSetAuthREdirect: (path) => dispatch(actions.setAuthRedirect(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));