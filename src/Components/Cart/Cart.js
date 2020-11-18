import React from 'react';
import {connect} from 'react-redux';
import './Cart.scss';
import {Link} from 'react-router-dom';
import creditCard from '../../icons/creditcard.png';
import applePay from '../../icons/apple-pay.svg';
import visa from '../../icons/visa.png';
import paypal from '../../icons/paypal.png';
import americanExpress from '../../icons/americanexpress.png';
import {decreaseQuantity, increaseQuantity, clearItem} from '../../redux/reducer';
import {loadStripe} from '@stripe/stripe-js';
import axios from 'axios';
const stripePromise = loadStripe(
    "pk_test_51HiC4WHbgMQS4ctVfDAs61r0WHq6drln0g9aNK5uuAV6smVAlpIIA9YQRr9FjTXhLmTzyr2FEcSk2kpTdVwHk7EL00MAE54pME"
);

class Cart extends React.Component{
    constructor(props){
        super(props);
    }

    decrease = (id) => {
        this.props.decreaseQuantity(id);
    }

    increase = (id) => {
        this.props.increaseQuantity(id);
    }

    remove = (id) => {
        this.props.clearItem(id);
    }

    checkOut = async (props) => {
        const stripe = await stripePromise;
        axios
            .post("/api/payments", {price: this.props.cart.totalPrice})
            .then((res) => {
                const id = res.data.id;
                return stripe.redirectToCheckout({ sessionId: id});
            })
            .then((res) => {
                if(res.error) {
                    alert(res.error.message);
                }
            })
            .catch((err) => {
                console.error('error', err);
            })
    }

    render(){
        const mappedItems = this.props.cart.items.map((product, i) => (
                <tr className="productInfoColumns">
                    <td className="totalColumn">
                        <div className="itemInfo">
                        <img src={product.img} alt="Cart image" className="CartImg" />
                        <div className="productInfo">
                            <div className="productDescColor">
                                {product.description} - {product.color}
                            </div>
                            <div className="productSize">
                                {product.size}
                            </div>
                            <div className="productPrice">
                                ${product.price}.00 USD
                            </div>
                            </div>
                        </div>
                    </td>
                    <td className="tdModify">
                        <div className="quantityModify">
                            <div className="btnsContainer">
                                <button onClick={() => this.decrease(product.item_id)}>-</button>
                                <div className="quantityNum">{product.quantity}</div>
                                <button onClick={() => this.increase(product.item_id)}>+</button>
                            </div>
                            <a className="removeLink" onClick={() => this.remove(product)}><div className="remove">Remove</div></a>
                        </div>
                    </td>
                    <td className="PriceColumn">
                        <div>
                            ${product.price}.00 USD
                        </div>
                    </td>
                </tr>
        ))

        if(this.props.cart.totalNumItems === 0){
            return(
                <div className="alternateView">
                    <h1>SHOPPING CART</h1>
                    <p>Your cart is currently empty. <br></br>
                    Continue browsing <Link to="/" className="links">here.</Link></p>
                </div>
            )
        }
        else{
            return(
                <div className="Cart">
                    <h1>SHOPPING CART</h1>
                    <table className="itemsTable">
                        <tr className="tableHeaders">
                            <th className="tableHeaderItems">ITEMS</th>
                            <th className="tableHeadersToRid">QUANTITY</th>
                            <th className="tableHeadersToRid">SUBTOTAL</th>
                        </tr>
                        {mappedItems}
                        <tr className="tableBottom">
                            <td className="continueShopping">
                                <Link to='/' className="links">
                                    <p>Continue Shopping</p>
                                </Link>
                            </td>
                            <td className="totalColumnName">
                                <h3>TOTAL</h3>
                            </td>
                            <td className="tableBottomPriceContainer">
                                <h3 className="tableBottomPrice">${this.props.cart.totalPrice}.00 USD</h3>
                            </td>
                        </tr>
                    </table>
                    <div className="footer">
                        <div className="paymentlogos">
                            <img src={creditCard} className="creditCard" alt='card' />
                            <img src={applePay} className="applePay" alt='card' />
                            <img src={visa} className="visa" alt='card' />
                            <img src={paypal} className="paypal" alt='card' />
                            <img src={americanExpress} className="americanExpress" alt='card' />
                        </div>
                        <button className="checkout" onClick={() => {
                            this.props.history.push('/payment')
                        }}>CHECK OUT</button>
                    </div>
                </div>
            )
        }
    }
}

const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps, {decreaseQuantity, increaseQuantity, clearItem})(Cart);