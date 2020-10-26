import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import './HomePage.scss';

class HomePage extends React.Component{
    constructor(){
        super();

        this.state = {
            mensProducts: [],
            womensProducts: []
        }
    }

    componentDidMount(){
        this.getMenProducts();
        this.getWomenProducts();
    }

    getMenProducts = () => {
        axios.get('/api/getMensProducts')
        .then(res => this.setState({mensProducts: res.data}))
        .catch(err=>console.log(err));
    }

    getWomenProducts = () => {
        axios.get('/api/getWomensProducts')
        .then(res => this.setState({womensProducts: res.data}))
        .catch(err => console.log(err));
    }

    render(){
        const mappedMale = this.state.mensProducts.map((product, i) => (
            <Link to={`/product/${product.item_id}`}>
                <div className="productBox">
                    <img src={product.img} alt="item image" className="productImg" />
                    <div className="newItem">
                        <div className="topProduct">
                            <p className='bar'>&#10074;</p> <p className="new">NEW</p>
                        </div>
                        <h4 className="price">${product.price}.00 USD</h4>
                    </div>
                    <p className="description">{product.description}</p>
                    <p className="color">{product.color}</p>
                </div>
            </Link>
        ))

        const mappedFemale = this.state.womensProducts.map((product, i) => (
            <Link to={`/product/${product.item_id}`} className="links">
                <div className="productBox">
                    <img src={product.img} alt="item image" className="productImg" />
                    <div className="newItem">
                        <div className="topProduct">
                            <p className='bar'>&#10074;</p> <p className="new">NEW</p>
                        </div>
                        <h4 className="price">${product.price}.00 USD</h4>
                    </div>
                    <p className="description">{product.description}</p>
                    <p className="color">{product.color}</p>
                </div>
            </Link>
        ))
        return(
            <div className='HomePage'>
                    <div className="textbox">
                        <h2>THE ADAPT FAMILY</h2>
                        <p>Brand new Adapt line is live</p>
                        <Link to='/womensproducts'>
                            <button className="shop">SHOP</button>
                        </Link>
                    </div>
                <img src='https://gymsharkrepl.s3-us-west-1.amazonaws.com/bannerphotos/homePageBanner1.jpg' alt="womens banner home page" className="WomensHomePage" />
                <div className="womansbanner">
                    <div className="bannertxt">
                        <h5>WOMENS</h5>
                        <h2>NEW RELEASES</h2>
                    </div>
                    <Link to='/womensproducts'>
                        <h4>View All</h4>
                    </Link>
                </div>
                <div className='grid'>
                    {mappedFemale}
                </div>
                <div className="mentextbox">
                        <h2>REST HARD</h2>
                        <p>Upgrade your rest day wardrobe with the Grade Collection</p>
                        <Link to='/mensproducts '>
                            <button className="shop">SHOP</button>
                        </Link>
                    </div>
                    <img src='https://gymsharkrepl.s3-us-west-1.amazonaws.com/bannerphotos/MaleBannerPhoto1.jpg' alt="mens banner home page" className="MensHomePage" /> 
                <div className="womansbanner">
                    <div className="bannertxt">
                        <h5>MENS</h5>
                        <h2>NEW RELEASES</h2>
                    </div>
                    <Link to='/mensproducts'>
                        <h4>View All</h4>
                    </Link>
                </div>
                <div className="grid">
                    {mappedMale}
                </div>
                <div className="bottomBanners">
                    <div className="MensBottomBannertxt">
                        <div>
                            <h2>SHOP</h2>
                            <h2>MENS</h2>
                            <Link to='/mensproducts'>
                                <button>SHOP</button>
                            </Link>
                        </div>
                    </div>
                    <Link to="/mensproducts">
                        <img src="https://gymsharkrepl.s3-us-west-1.amazonaws.com/bannerphotos/shopmenshomepage2.webp" alt="mens banner bottom" className="mensBottomBanner" />
                    </Link>
                    <div className="WomensBottomBannertxt">
                        <div>
                            <h2>SHOP</h2>
                            <h2>WOMENS</h2>
                            <Link to='/mensproducts'>
                                <button>SHOP</button>
                            </Link>
                        </div>
                    </div>
                    <Link to="/womensproducts">
                        <img src="https://gymsharkrepl.s3-us-west-1.amazonaws.com/bannerphotos/shopwomenshomepage2.webp" alt="Womens Bottom Banner" className="BottomBanner" />
                    </Link>
                </div> 
                <div className="bottomtxt">
                    <div className="Btxt">
                        <h5>MORE THAN YOUR BEST WORKOUT CLOTHING</h5>
                        <p>The Gymshark community is devoted to unlocking potential through conditioning and the things we do today to prepare for tomorrow. When it comes to performing at your max, there should be no obstacles – least of all your workout clothes. So everything about the gym clothes and accessories we design for you has your progress and the best results in mind. We want you to have the most comfortable gym hoodies, the most supportive seamless leggings and the most innovatively designed workout shirts that are made to move when it matters most.</p>
                        <p>Game-changing workout clothing. It's not just in the designs, It's in the people that wear them</p>
                    </div>
                </div>
            </div>
        )
    }

}

export default HomePage;