import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {clearCart} from '../../redux/reducer';
import axios from 'axios';
import './Payment.scss';
import {loadStripe} from '@stripe/stripe-js';
import {Elements, 
        useStripe, 
        useElements, 
        CardElement} from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51HiC4WHbgMQS4ctVfDAs61r0WHq6drln0g9aNK5uuAV6smVAlpIIA9YQRr9FjTXhLmTzyr2FEcSk2kpTdVwHk7EL00MAE54pME');

const CARD_ELEMENT_OPTIONS = {
    style: {
        base: {
        color: '#32325d',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
            color: '#aab7c4'
        }
        },
        invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
        }
    }
    };

const CheckoutForm = (props) => {
    const [error, setError] = useState(null);
    const stripe = useStripe();
    const elements = useElements();

    const [state, cState] = useState({
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        state: '',
        zip: ''
    });

    const handleFocus = () => {
        console.log('[focus]');
    };

    const handleChange = (event) => {
        if (event.error) {
            setError(event.error.message);
        } else {
            setError(null);
        }
    }

    const handleInput = (e) => {
        cState({...state, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement)
        });

        if(!error){
            const {id} = paymentMethod;

            try{
                const amount = props.amount;
                const response = await axios.post('/api/charge', {id, amount})
                props.success();
                console.log(response);
            } catch (error) {
                alert(error.message)
                console.log(error);
            }
        }
    }
    return (
        <form onSubmit={handleSubmit} className='checkout-form'>
            <div className="name-display">
                <input
                    className="CfirstName"
                    type="text"
                    value={state.firstName}
                    name="firstName"
                    onChange={(e) => handleInput(e)}
                    placeholder="Jane"
                />
                <input
                    className="ClastName"
                    type="text"
                    value={state.lastName}
                    name="lastName"
                    onChange={(e) => handleInput(e)}
                    placeholder="Doe"
                />
            </div>
            <input 
                className="address"
                type="text"
                value={state.address}
                name="address"
                onChange={(e) => handleInput(e)}
                placeholder="1234 Address St."
            />
            <div className="addressInfo">
                <input 
                    className="city"
                    type="text"
                    value={state.city}
                    name="city"
                    onChange={(e) => handleInput(e)}
                    placeholder="Salt Lake City"
                />
                <input 
                    className="state"
                    type="text"
                    value={state.state}
                    name="state"
                    onChange={(e) => handleInput(e)}
                    placeholder="UT"
                />
                <input 
                    className="zip"
                    type="text"
                    value={state.zip}
                    name="zip"
                    onChange={(e) => handleInput(e)}
                    placeholder="84101"
                />
            </div>

            <CardElement
                onFocus={handleFocus}
                id='card-element'
                options={CARD_ELEMENT_OPTIONS}
                onChange={handleChange}
            />

            <div className="cardErrors" role="alert">{error}</div>

            <button className="pay-button" type="submit" disabled={!stripe}>PAY</button>
        </form>
    )
};

const Checkout = (props) => {
    const [status, setStatus] = useState('');
    useEffect(() => {
        if (status === 'success'){
            props.clearCart();
            props.history.push('/success');
        }
    }, [status])

    const amount = props.cart.totalPrice * 100;

    const success = () => {
        setStatus('success')
    }

    let taxTotal = props.cart.totalPrice*0.041;
    let total = props.cart.totalPrice + taxTotal;

    return(
        <div className="checkout-Form">
            <h2>CHECKOUT</h2>
            <div className="cart-Info">
                <p>SUBTOTAL: ${props.cart.totalPrice}.00</p>
                <p>TAX: ${taxTotal.toFixed(2)}</p>
                <p>TOTAL: ${total.toFixed(2)}</p>
            </div>
            <Elements stripe={stripePromise}>
                <CheckoutForm
                    success={success}
                    amount={amount}
                />
            </Elements>
        </div>
    )
}

const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps, {clearCart})(Checkout);