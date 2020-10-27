import React from 'react';
import axios from 'axios';
import './Product.scss';

class Product extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            product: {},
            likeProducts: []
        }
    }

    componentDidMount(){
        this.getProduct();
        // this.getLikeProducts();
    }

    componentDidUpdate(){
        this.getLikeProducts();
    }

    getProduct = () => {
        axios.get(`/api/menproduct/${this.props.match.params.id}`)
        .then(res => this.setState({product: res.data}))
        .catch(err => console.log(err));
    }

    getLikeProducts = () => {
        axios.get(`/api/menlikeproducts/${this.state.product.description}`)
        .then(res =>this.setState({likeProducts: res.data}))
        .catch(err => console.log(err));
    }
    
    render(){
        const {color, description, img, item_id, name, price} = this.state.product;
        console.log(this.state.likeProducts);
        
        return(
            <div className="Product">
                <div className="productBox">
                    <img src={img} alt="product image" className="productImage" /> 
                    <div className="productInfo">
                        <p className="productName">{name}</p>
                        <h2>{description}</h2>
                        <p>${price}.00 USD</p>
                        <div className="colorDisplay">

                        </div>
                        <p className="currentColor">{color}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Product;