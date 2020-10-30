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

    render(){
        // console.log(this.props.decreaseQuantity();)
        console.log(this.props);
        const mappedItems = this.props.cart.items.map((product, i) => (
                <tr>
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
                            <a className="removeLink"><div className="remove">Remove</div></a>
                        </div>
                    </td>
                    <td className="PriceColumn">
                        <div>
                            ${product.price}.00 USD
                        </div>
                    </td>
                </tr>
        ))

        console.log(this.props)

        return(
            <div className="Cart">
                <h1>SHOPPING CART</h1>
                <table className="itemsTable">
                    <tr className="tableHeaders">
                        <th className="tableHeaderItems">ITEMS</th>
                        <th>QUANTITY</th>
                        <th>SUBTOTAL</th>
                    </tr>
                    {mappedItems}
                    <tr className="tableBottom">
                        <td>
                            <Link to='/' className="links">
                                <p>Continue Shopping</p>
                            </Link>
                        </td>
                        <td>
                            <h3>TOTAL</h3>
                        </td>
                        <td>
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
                    <button className="checkout">CHECK OUT</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps, {decreaseQuantity, increaseQuantity, clearItem})(Cart);