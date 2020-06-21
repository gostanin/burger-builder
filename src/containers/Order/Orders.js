import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }
    
    componentDidMount() {
        axios.get('/orders.json')
            .then(res => {
                console.log(res.data);
                const fetchedOrder = [];
                for (let key in res.data) {
                    fetchedOrder.push({
                        ...res.data[key],
                        id: key
                    });
                };
                console.log(res);
                this.setState({loading: false, orders: fetchedOrder})
            })
            .catch(err => {
                this.setState({loading: false});
            });
    }

    render () {
        return (
            <div>
                {this.state.orders.map(order => (
                    <Order key={order.id} price={order.price} ingredients={order.ingredients}/>
                ))}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);