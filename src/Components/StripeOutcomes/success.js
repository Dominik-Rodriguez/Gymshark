import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {clearCart} from '../../redux/reducer';
import './success.scss';

function Success(props){
    const [state, sState] = useState({

    })
    useEffect(() => {
        const itemsArray = props.cart.items;
        const orderNumber = props.match.params.id;
        axios
        .post('/api/purchasedItems', {
            itemsArray, orderNumber
        }).then(res => {})
        .catch(err=>console.log(err));

        props.clearCart();
    }, [])
    // console.log(props.match.params.id);
    return(
        <div className="Success">
            <div className="successBox">
                <h2>Thank you for shopping with us!</h2>
                <p>We hope you appreciate your products, and
                we hope to remain a trusted brand in your fitness journey.</p>
            </div>
        </div>
    )
}

const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps, {clearCart})(Success);