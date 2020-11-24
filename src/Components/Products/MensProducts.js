import axios from 'axios';
import React from 'react';
import {Link} from 'react-router-dom';
import './MensProducts.scss';

class MensProducts extends React.Component{
    constructor(){
        super();

        this.state = {
            products: []
        }
    }

    componentDidMount(){
        this.getProducts();
    }

    getProducts = () => {
        axios.get('/api/mensproducts')
        .then(res => this.setState({products: res.data}))
        .catch(err=>console.log(err));
    }

    render(){
        const mappedProducts = this.state.products.map((product, i) => (
            <Link to={`/menproduct/${product.item_id}`} className="links">
                <div className="MensproductBox" key={i}>
                    <img src={product.img} alt="item image" className="productImg" />
                    <div className="toptxt">
                        <p className="description">{product.description}</p>
                        <h4 className="price">${product.price}.00 USD</h4>
                    </div>
                    <p className="color">{product.color}</p>
                </div>
            </Link>
        ))
        return(
            <div className="Products">
                <div className="Mensbannertxt">
                    GYMSHARK
                    <div className="Mensbannertxt2">
                        MENS
                    </div>
                </div>
                <div className="MensMainBannerContainer">
                    <img src="https://gymsharkrepl.s3-us-west-1.amazonaws.com/bannerphotos/MensMainBanner1.jpg" alt="Mens product banner" className="MensMainBanner" />
                </div>
                {mappedProducts}
                <div className="bottomtxt">
                    <div className="Btxt">
                        <h5>MEN'S WORKOUT CLOTHES</h5>
                        <p>Explore all men's Gymshark clothing. Gym and fitness clothes designed to complement the hard work and dedication you put in your workouts.</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default MensProducts;