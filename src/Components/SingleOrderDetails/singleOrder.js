import React from 'react';
import axios from 'axios';
import './singleOrder.scss';
import {Link} from 'react-router-dom';

class singleOrder extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            purchasedItems: []
        }
    }

    componentDidMount(){
        this.getOrder();
    }

    getOrder = () => {
        axios.get(`/api/singleOrder/${this.props.match.params.id}`)
        .then(res => this.setState({purchasedItems: res.data}))
        .catch(err => console.log(err));
    }

    render() {
        const mappedItems = this.state.purchasedItems.map((item, i) => (
            <tr>
                <td className="itemInfo">{item.description} - {item.color} - {item.size}</td>
                <td>${item.price}.00</td>
                <td>{item.quantity}</td>
                <td>${item.price * item.quantity}.00</td>
            </tr>
        ))
        return(
            <div className="SingleOrder">
                <h2>ORDER #{this.props.match.params.id}</h2>
                <Link to="/profileInfo" className="links">
                    <p className="ReturnButton">Return To Account Details </p>
                </Link>
                <table className="OrdersTable">
                    <tr className="tableHeader">
                        <th>PRODUCT</th>
                        <th>PRICE</th>
                        <th>QUANTITY</th>
                        <th>TOTAL</th>
                    </tr>    
                    {mappedItems}
                </table>
            </div>
        )
    }
}

export default singleOrder;