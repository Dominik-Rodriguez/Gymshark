import React from 'react';
import {Link} from 'react-router-dom';
// import {connect} from 'react-redux';
import './Header.scss';
import gymsharkIcon from '../../icons/gymshark.svg';
import loginIcon from '../../icons/SVG/loginIcon.svg';
import cartIconWider from '../../icons/SVG/cartIconWider.svg';
import {connect} from 'react-redux';

class Header extends React.Component{
    constructor(){
        super();

        this.state = {
            menu: false
        }
    }

    // componentDidUpdate(){
    //     console.log(this.props.cart.totalNumItems);
    // }

    slide = () => {
        this.setState({menu: !this.state.menu})
    }

    render(){
        // console.log(this.props.cart.totalNumItems);
        return(
            <header className="Header">
                <Link to='/'>
                    <img src={gymsharkIcon} alt="home" className="homeBtn" />
                </Link>
                {/* desktop view */}
                <nav className="tablet-header">
                    <div className="navbar-menu">
                        <Link to="/mensproducts">
                            <a href="" className="Mens">MENS</a>
                        </Link>
                        <Link to="/womensproducts">
                            <a href="" className="Womens">WOMENS</a>
                        </Link>
                        <Link to="/accessories">
                            <a href="" className="Accessories">ACCESSORIES</a>
                        </Link>
                    </div>
                </nav>

                <div>
                    <Link to='/login'>
                        <img src={loginIcon} alt="login" className="loginIcon" /> 
                    </Link>
                    <Link to='/cart'>
                        <div className="CartCount">{this.props.cart.totalNumItems}</div>
                        <img src={cartIconWider} alt='cart' className='cartIcon' />
                    </Link>
                </div>

                {/* slide out menu */}
                {/* <div className="menu">
                    <a href="" className="MensSide">MENS</a>
                    <a href="" className="WomensSide">WOMENS</a>
                    <a href="" className="AboutUs">ABOUT US</a>
                    {/* <a>ACCESSORIES</a> */}
                {/* </div> */}
            </header>
        )
    }
}

const mapPropsToState = (reduxState) => reduxState;

export default connect(mapPropsToState, null)(Header);