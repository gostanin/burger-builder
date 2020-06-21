import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = () => {
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: {
                name: 'Max',
                address: {
                    street: 'Main 1',
                    zipCode: '99999',
                    counry: 'Germany'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fasters'
        };
        axios.post('/orders.json', order)
        .then(response => { 
            this.setState({loading: false, purchasing: false})
            this.props.history.push('/');
        })
        .catch(error => this.setState({loading: false, purchasing: false}));
    }

    render () {
        let form = (<form>
            <input type="text" name="name" placeholder="Your name" />
            <input type="text" name="name" placeholder="Your name" />
            <input type="text" name="name" placeholder="Your name" />
            </form>);

        if (this.state.loading) {
            form = <Spinner />
        }

        return (
            <div>
                <h4>Enter your contact data</h4>
                {form}
                <Button btnType='Success' clicked={this.orderHandler}>Order</Button>
            </div>
        )
    }
}

export default ContactData;