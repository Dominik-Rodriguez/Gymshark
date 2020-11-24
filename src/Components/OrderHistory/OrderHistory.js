import React from 'react';
import axios from 'axios';
import './OrderHistory.scss';
import {Link} from 'react-router-dom';

class OrderHistory extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            orders: [],
            user: {}
        }
    }
    componentDidMount(){
        this.getOrderHistory();
        this.getUserInfo();
    }

    getOrderHistory = () => {
        axios.get('/api/OrderHistory')
        .then(res => this.setState({orders: res.data}))
        .catch(err => console.log(err));
    }

    getUserInfo = () => {
        axios.get('/api/userInfo')
        .then(res => this.setState({user: res.data}))
        .catch(err => console.log(err));
    }

    render(){
        const mappedOrders = this.state.orders.map((o, i) => (
            <tr>
                <Link to={`/OrderDetails/${o.order_id}`} className="links">
                    <td className="order_Id">{o.order_id}</td>
                </Link>
                <td>{o.order_date}</td>
                <td>{o.order_total_price}</td>
            </tr>
        ))
        return(
            <div className="OrderHistoryMain">
                <h2>ACCOUNT DETAILS AND ORDER HISTORY</h2>
                <div className="OrderHistory">
                    <div className="userInfo">
                        <div className="username">
                            {this.state.user.first_name} {this.state.user.last_name}
                        </div>
                        <div className="userEmail">
                            {this.state.user.email}
                        </div>
                        <div className="userAddress">
                            {this.state.user.address}
                        </div>
                        <div className="userLocation">
                            {this.state.user.city} {this.state.user.state}
                        </div>
                        <div className="userCountry">
                            {this.state.user.country}
                        </div>
                    </div>
                    <table className="OrdersTable">
                        <tr className="tableHeader">
                            <th>ORDER</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                        </tr>
                        {mappedOrders}
                    </table>
                </div>
            </div>
        )
    }
}

export default OrderHistory;