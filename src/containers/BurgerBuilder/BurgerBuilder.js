import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}
class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasebale: false,
        purchasing: false,
        loading: null,
        error: false
    }

    componentDidMount () {
        axios.get('***REMOVED***ingredients.json')
        .then(response => {
            this.setState((prevState) => {
                let purch = !prevState.purchasebale;
                if (Object.values(response.data).reduce((a,b) => a+b, 0) > 0) {
                    purch = true;
                }
                
                return {purchasebale: purch, ingredients: response.data}
            });
    
        })
        .catch(error => {this.setState({error: true})});
    }

    purchaseHandler = () => {
        this.setState((prevState) => {
            return {purchasing: !prevState.purchasing};
        });
    }

    purchaseContinueHandler = () => {
        this.props.history.push({
            pathname: '/checkout',
            state: { ingredients: this.state.ingredients,
                    totalPrice: this.state.totalPrice}
        })
    }

    updatePurchaseState (ingredients) {
        const sum = Object.values(ingredients).reduce((a, b) => a+b, 0);
        
        if (sum > 0)
            this.setState({purchasebale: true});
        else
            this.setState({purchasebale: false});
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const ingredients = {...this.state.ingredients};
        const currentAmount = ingredients[type]
        let price = this.state.totalPrice
        if (currentAmount > 0) {
            ingredients[type] -= 1;
            price = price - INGREDIENT_PRICES[type];
        }
        this.setState({totalPrice: price, ingredients: ingredients})
        this.updatePurchaseState(ingredients);
    }

    render () {
        const disabledInfo ={
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients cannot be loaded</p> : <Spinner />;

        if (this.state.ingredients) {
            burger = (
                <React.Fragment>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}    
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchasebale={this.state.purchasebale}
                    orderClick={this.purchaseHandler}/>
                </React.Fragment>
            );

            orderSummary = <OrderSummary 
                            ingredients={this.state.ingredients}
                            continue={this.purchaseContinueHandler}
                            cancel={this.purchaseHandler}
                            price={this.state.totalPrice}/>
        }

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
            <React.Fragment>
                <Modal 
                    show={this.state.purchasing}
                    orderClick={this.purchaseHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </React.Fragment>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);