import axios from 'axios';
import React from 'react';
import {Link} from 'react-router-dom';
import './WomensProducts.scss';

class WomensProducts extends React.Component{
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
        axios.get('/api/womensproducts')
        .then(res => this.setState({products: res.data}))
        .catch(err=>console.log(err));
    }

    render(){
        const mappedProducts = this.state.products.map((product, i) => (
            <Link to={`/womenproduct/${product.item_id}`} className="links">
                <div className="WomensproductBox" key={i}>
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
                <div className="Womensbannertxt">
                    GYMSHARK
                    <div className="Womensbannertxt2">
                        WOMENS
                    </div>
                </div>
                <div className="WomensMainBannerContainer">
                    <img src="https://gymsharkrepl.s3-us-west-1.amazonaws.com/bannerphotos/WomensMainBanner1.jpg" alt="womens main banner" className="WomensMainBanner" />
                </div>
                {mappedProducts}
                <div className="bottomtxt">
                    <div className="Btxt">
                        <h5>WOMEN'S WORKOUT CLOTHES</h5>
                        <p>Explore all women's Gymshark clothing. Gym and fitness clothing designed for cool and comfortable workouts, allowing for ultimate performance.</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default WomensProducts;