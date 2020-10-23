import React from 'react';
import {Link} from 'react-router-dom';
// import {connect} from 'react-redux';
import './Header.scss';
import gymsharkIcon from '../../icons/gymshark.svg';
import loginIcon from '../../icons/SVG/loginIcon.svg';
import cartIcon from '../../icons/SVG/cartIcon.svg';

class Header extends React.Component{
    constructor(){
        super();

        this.state = {
            menu: false
        }
    }

    slide = () => {
        this.setState({menu: !this.state.menu})
    }

    render(){
        console.log(this.state.menu)
        return(
            <header className="Header">
                <Link to='/'>
                    <img src={gymsharkIcon} alt="home" className="homeBtn" />
                </Link>
                {/* desktop view */}
                <nav className="tablet-header">
                    {/* <button className="navBtn" onClick={this.slide}>&#9776;</button> */}
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
                        <img src={cartIcon} alt='cart' className='cartIcon' />
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

export default Header;