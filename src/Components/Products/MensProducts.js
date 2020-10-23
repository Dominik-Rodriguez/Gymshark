import axios from 'axios';
import React from 'react';
import {Link} from 'react-router-dom';

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
            <div className="Products">
                {mappedProducts}
            </div>
        )
    }
}

export default MensProducts;