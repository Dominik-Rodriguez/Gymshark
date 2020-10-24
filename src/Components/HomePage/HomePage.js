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
                    <img src={product.img} alt="item image" />
                    <p>{product.description}</p>
                    <p>{product.color}</p>
                    <h4>{product.price}</h4>
                </div>
            </Link>
        ))

        const mappedFemale = this.state.womensProducts.map((product, i) => (
            <Link to={`/product/${product.item_id}`}>
                <div className="productBox">
                    <img src={product.img} alt="item image" />
                    <p>{product.description}</p>
                    <p>{product.color}</p>
                    <h4>{product.price}</h4>
                </div>
            </Link>
        ))
        return(
            <div className='HomePage'>
                    <div className="textbox">
                        <h2>THE ADAPT FAMILY</h2>
                        <p>Brand new Adapt line is live</p>
                        <Link to='womensproducts'>
                            <button className="shop">SHOP</button>
                        </Link>
                    </div>
                <img src='https://gymsharkrepl.s3-us-west-1.amazonaws.com/bannerphotos/homePageBanner1.jpg' alt="banner home page" className="WomensHomePage" />
                <div className="womansbanner">
                    <div className="bannertxt">
                        <h5>GYMSHARK</h5>
                        <h2>WOMENS</h2>
                    </div>
                    <Link to='/womensproducts'>
                        <h4>View All</h4>
                    </Link>
                </div>
                {mappedFemale}
                {mappedMale}
            </div>
        )
    }

}

export default HomePage;