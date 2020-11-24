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

    const [cState, setcState] = useState({
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        email: ''
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

    // const checkInput = (e) => {
    //     if(cState.firstName === '' || cState.lastName === '' || cState.address === '' || cState.city === '' || cState.state === '' || cState.zip === ''){
    //         e.preventDefault();
    //         alert('Please fill the entire form before submitting.')
    //     }
    // }

    const handleInput = (e) => {
        setcState({...cState, [e.target.name]: e.target.value})
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
                alert(error.message);
            }
        }
    }

    return (
        <form onSubmit={handleSubmit} className='checkout-form'>
            <CardElement
                onFocus={handleFocus}
                id='card-element'
                options={CARD_ELEMENT_OPTIONS}
                onChange={handleChange}
            />

            <div className="cardErrors" role="alert">{error}</div>

            <button className="pay-button" type="submit" disabled={!stripe} >PAY</button>
        </form>
        // onClick={(e) => checkInput(e)}
    )
};

const Checkout = (props) => {
    const [date, setDate] = useState(new Date());
    const [status, setStatus] = useState('');
    const [cState, setcState] = useState({
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        email: ''
    });
    const [orderId, setOrderId] = useState(null);

    const checkInput = (e) => {
        if(cState.firstName === '' || cState.lastName === '' || cState.address === '' || cState.city === '' || cState.state === '' || cState.zip === ''){
            e.preventDefault();
            alert('Please fill the entire form before submitting.')
        }
    }

    const handleInput = (e) => {
        setcState({...cState, [e.target.name]: e.target.value})
    }


    useEffect(() => {
        if (status === 'success'){
            // props.clearCart();
            props.history.push('/success' + '/' + orderId);
        }
    }, [status])

    let taxTotal = props.cart.totalPrice*0.041;
    let total = props.cart.totalPrice + taxTotal;
    let numberOfItems = props.cart.totalNumItems;

    const amount = props.cart.totalPrice * 100;

    const success = () => {
        const firstName = cState.firstName;
        const lastName = cState.lastName;
        const email = cState.email;
        const state = cState.state;
        const zip = cState.zip;
        const address = cState.address;
        const city = cState.city;
        const totalPrice = total.toFixed(2);
        const totalNumItems = numberOfItems;

        axios
        // .post('/api/purchasedItems', {
        .post('/api/orderUserInfo', {
            firstName, lastName, email, city, state, zip, address, totalPrice, totalNumItems, date
        })
        .then(res => {setOrderId(res.data.order_id)
            setStatus('success')})
        .catch(err => props.history.push('/failure'));

        // setStatus('success')
    }

    console.log(props);

    return(
        <div className="checkout-Form">
            <h2>CHECKOUT</h2>
            <div className="cart-Info">
                <div className="P-subtotal">
                    <div>
                       <p>SUBTOTAL: </p> 
                    </div>
                    <div>
                        <p>${props.cart.totalPrice}.00</p> 
                    </div>
                </div>
                <div className="P-tax">
                    <div>
                        <p>TAX: </p>
                    </div>
                    <div>
                        <p>${taxTotal.toFixed(2)}</p>
                    </div>
                </div>
                <div className="P-total">
                    <div>
                        <p>TOTAL: </p>
                    </div>
                    <div>
                        <p>${total.toFixed(2)}</p>
                    </div>
                </div>
            </div>
            <div className="checkout-form">
                <div className="name-display">
                    <input
                        className="CfirstName"
                        type="text"
                        value={cState.firstName}
                        name="firstName"
                        onChange={(e) => handleInput(e)}
                        placeholder="Jane"
                    />
                    <input
                        className="ClastName"
                        type="text"
                        value={cState.lastName}
                        name="lastName"
                        onChange={(e) => handleInput(e)}
                        placeholder="Doe"
                    />
                </div>
                <input 
                    className="address"
                    type="text"
                    value={cState.email}
                    name="email"
                    onChange={(e) => handleInput(e)}
                    placeholder="Example@mail.com"
                />
                <input 
                    className="address"
                    type="text"
                    value={cState.address}
                    name="address"
                    onChange={(e) => handleInput(e)}
                    placeholder="1234 Address St."
                />
                <div className="addressInfo">
                    <input 
                        className="city"
                        type="text"
                        value={cState.city}
                        name="city"
                        onChange={(e) => handleInput(e)}
                        placeholder="Salt Lake City"
                    />
                    <input 
                        className="state"
                        type="text"
                        value={cState.state}
                        name="state"
                        onChange={(e) => handleInput(e)}
                        placeholder="UT"
                    />
                    <input 
                        className="zip"
                        type="text"
                        value={cState.zip}
                        name="zip"
                        onChange={(e) => handleInput(e)}
                        placeholder="84101"
                    />
                </div>
                <p>{orderId}</p>
            </div>
            <Elements stripe={stripePromise}>
                <CheckoutForm
                    // cart={props.cart}
                    success={success}
                    amount={amount}
                />
            </Elements>
        </div>
    )
}

const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps, {clearCart})(Checkout);