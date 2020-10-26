import axios from 'axios';
import React from 'react';
import {Link} from 'react-router-dom';
import './Accessories.scss';

class Accessories extends React.Component{
    constructor(){
        super();

        this.state = {
            products: []
        }
    }

    componentDidUpdate(){
        this.getProducts();
    }

    getProducts = () => {
        axios.get('/api/accessories')
        .then(res => this.setState({products: res.data}))
        .catch(err => console.log(err));
    }

    render(){
        const mappedProducts = this.state.products.map((product, i) => (
            <Link to={`/product/${product.item_id}`} className="links">
                <div className="productBox">
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
                <div className="bannertxt">
                    GYMSHARK
                    <div className="bannertxt2">
                        ACCESSORIES
                    </div>
                </div>
                <img src="https://gymsharkrepl.s3-us-west-1.amazonaws.com/bannerphotos/AccessoriesBanner1.jpg" alt="womens main banner" className="WomensMainBanner" />
                {mappedProducts}
                <div className="bottomtxt">
                    <div className="Btxt">
                        <h5>ACCESSORIES</h5>
                        <p>Explore our collection of gym accessories for a range of workout essentials. Gymshark hats and gym towels keep sweat under control, and our signature water bottles allow for ultimate hydration even on long days in and out of the gym. Pair these necessities with our extensive and unique men's gym wear and women's workout clothing for innovative and stylish outfits that keep you performing at your best. Take your workouts to the next level with Gymshark.</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Accessories;