import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';


class BurgerBuilder extends Component {
    state = {
        purchasing: false
    }

    componentDidMount () {
        this.props.initIngredients();
    }

    purchaseHandler = () => {
        this.setState((prevState) => {
            return {purchasing: !prevState.purchasing};
        });
    }

    purchaseContinueHandler = () => {
        this.props.onInitPuchase();
        this.props.history.push('/checkout');
    }

    updatePurchaseState (ingredients) {
        const sum = Object.values(ingredients).reduce((a, b) => a+b, 0);
        return sum > 0
    }

    render () {
        const disabledInfo ={
            ...this.props.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients cannot be loaded</p> : <Spinner />;

        if (this.props.ingredients) {
            burger = (
                <React.Fragment>
                <Burger ingredients={this.props.ingredients}/>
                <BuildControls
                    ingredientAdded={this.props.addIngredientHandler}    
                    ingredientRemoved={this.props.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.props.totalPrice}
                    purchasebale={this.updatePurchaseState(this.props.ingredients)}
                    orderClick={this.purchaseHandler}/>
                </React.Fragment>
            );

            orderSummary = <OrderSummary 
                            ingredients={this.props.ingredients}
                            continue={this.purchaseContinueHandler}
                            cancel={this.purchaseHandler}
                            price={this.props.totalPrice}/>
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

const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addIngredientHandler: (ingName) => dispatch(actions.addIngredientHandler(ingName)),
        removeIngredientHandler: (ingName) => dispatch(actions.removeIngredientHandler(ingName)),
        initIngredients: () => dispatch(actions.initIngredients()),
        onInitPuchase: () => dispatch(actions.purchaseInit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));