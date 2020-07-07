import React, { useState, useEffect, useCallback } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions/index';


const BurgerBuilder = props => {
    const [purchasing, setPurchasing] = useState(false);

    const dispatch = useDispatch();
    const addIngredientHandler = (ingName) => dispatch(actions.addIngredientHandler(ingName));
    const removeIngredientHandler = (ingName) => dispatch(actions.removeIngredientHandler(ingName));
    const initIngredients = useCallback(() => dispatch(actions.initIngredients()), [dispatch]);
    const onInitPuchase = () => dispatch(actions.purchaseInit());
    const onSetAuthREdirect = (path) => dispatch(actions.setAuthRedirect(path));

    const ingredients = useSelector(state => {
        return state.burgerBuilder.ingredients
    })
    const totalPrice = useSelector(state => {
        return state.burgerBuilder.totalPrice
    })
    const error = useSelector(state => {
        return state.burgerBuilder.error
    })
    const isAuth = useSelector(state => {
        return state.auth.token != null
    })

    useEffect(() => {
        initIngredients();
    }, [initIngredients])
    
    const purchaseHandler = () => {
        if (isAuth) {
            setPurchasing(!purchasing);
        }
        else {
            onSetAuthREdirect('/checkout');
            props.history.push('/auth');
        }
    }

    const purchaseContinueHandler = () => {
        onInitPuchase();
        props.history.push('/checkout');
    }

    const updatePurchaseState = (ingredients) => {
        const sum = Object.values(ingredients).reduce((a, b) => a+b, 0);
        return sum > 0
    }

    const disabledInfo ={
        ...ingredients
    };
    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0
    }
    let orderSummary = null;
    let burger = error ? <p>Ingredients cannot be loaded</p> : <Spinner />;

    if (ingredients) {
        burger = (
            <React.Fragment>
            <Burger ingredients={ingredients}/>
            <BuildControls
                ingredientAdded={addIngredientHandler}    
                ingredientRemoved={removeIngredientHandler}
                disabled={disabledInfo}
                price={totalPrice}
                purchasebale={updatePurchaseState(ingredients)}
                orderClick={purchaseHandler}
                isAuth={isAuth}/>
            </React.Fragment>
        );

        orderSummary = <OrderSummary 
                        ingredients={ingredients}
                        continue={purchaseContinueHandler}
                        cancel={purchaseHandler}
                        price={totalPrice}/>
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

export default withErrorHandler(BurgerBuilder, axios);