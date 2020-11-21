import React from 'react';
import axios from 'axios';
import './OrderHistory.scss';

class OrderHistory extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            orders: []
        }
    }
    componentDidMount(){
        this.getOrderHistory();
    }
    getOrderHistory = () => {
        axios.get('/api/OrderHistory')
        .then(res => this.setState({orders: res.data}))
        .catch(err => console.log(err));
    }

    render(){
        const mappedOrders = this.state.orders.map((product, i) => (
            <div className="OrderDisplay">
                
            </div>
        ))
        return(
            <div className="OrderHistory">
                
            </div>
        )
    }
}

export default OrderHistory;