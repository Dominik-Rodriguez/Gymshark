import React from 'react';
import {Link} from 'react-router-dom';
// import {connect} from 'react-redux';
import './Footer.scss';
import gymsharklogo from '../../icons/Main.svg';
import creditCard from '../../icons/creditcard.png';
import applePay from '../../icons/apple-pay.svg';
import visa from '../../icons/visa.png';
import paypal from '../../icons/paypal.png';
import americanExpress from '../../icons/americanexpress.png';
import gymsharkBlog from '../../icons/GymsharkBlogLogo.svg';

class Footer extends React.Component{
    // constructor(){
    //     super();
    // }

    render(){
        return(
            <footer className="Footer">
                <div className="left-container">
                    <Link to="/">
                        <img src={gymsharklogo} alt="home" className="homebtn"/>
                    </Link>
                    <div className="lists">
                        <div className="help">
                            <h5>HELP</h5>
                            <ul>
                                {/* MAKE SURE TO LINK THESE ITEMS */}
                                <li>FAQs</li>
                                <li>Delivery & returns</li>
                                <li>Orders</li>
                            </ul>
                        </div>
                        <div className="pages">
                            <h5>PAGES</h5>
                            <ul>
                                <li>Careers</li>
                                <li>Gymshark Central</li>
                                <li>Conditioning App</li>
                                {/* ABOUT US IS THE LINK FOR INTERNAL USE. */}
                                <li>About Us</li>
                                <li>Student Beans</li>
                            </ul>
                        </div>
                        <div className="myAccount">
                            <h5>MY ACCOUNT</h5>
                            <ul>
                                <Link to="/Login" className="links">
                                    <li>Login</li>
                                </Link>
                            </ul>
                        </div>
                    </div>
                    <div className="paymentlogos">
                        <img src={creditCard} className="creditCard" alt='card' />
                        <img src={applePay} className="applePay" alt='card' />
                        <img src={visa} className="visa" alt='card' />
                        <img src={paypal} className="paypal" alt='card' />
                        <img src={americanExpress} className="americanExpress" alt='card' />
                    </div>
                </div>
                <div className="right-container">
                    <img src={gymsharkBlog} className="gymsharkBlog" alt='gymshark blog' />
                    <p>Visit the <a href="https://www.gymshark.com/blogs/news">Gymshark Blog</a></p>
                    <h5>SIGN UP FOR OUR NEWSLETTER</h5>
                    <div className="emailStuff">
                        <input type="text" placeholder="Your Email Address" className="emailInput"/><button className="blogBtn">></button>
                    </div>
                </div>
            </footer>
        )
    }
}

export default Footer;