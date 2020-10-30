import React from 'react';
import axios from 'axios';
import './WomenProduct.scss';
import {Link} from 'react-router-dom';

class Product extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            product: {},
            likeProducts: [],
            size: ''
        }
    }

    componentDidMount(){
        this.getProduct();
    }

    getProduct = () => {
        axios.get(`/api/womenproduct/${this.props.match.params.id}`)
        .then(res => this.setState({product: res.data}, () => {
            this.getLikeProducts();
        }))
        .catch(err => console.log(err));
    }

    getDifferentProduct = (i) => {
        const target_id = this.state.likeProducts[i].item_id;
        axios.get(`/api/womendifferentProduct/${target_id}`)
        .then(res => this.setState({product: res.data}))
        .catch(err => console.log(err));
    }
    
    getLikeProducts = () => {
        axios.get(`/api/womenlikeproduct/${this.state.product.description}`)
        .then(res =>this.setState({likeProducts: res.data}))
        .catch(err => console.log(err));
    }
    
    render(){
        const {color, description, img, item_id, name, price} = this.state.product;

        const mappedLikeProducts = this.state.likeProducts.map((product, i) => (
                <div className="likeProductPhotos">
                    <a><img src={product.img} alt="item like image" className="likeProductImage" onClick={()=>{this.getDifferentProduct(i)}} /> </a>
                </div>
        ))
        
        return(
            <div className="Product">
                <div className="productBox">
                    <div className="left-side">
                        <p className="hometxt"><Link to="/" className="links">HOME</Link> - {description} - {color}</p>
                        <img src={img} alt="product image" className="productImage" />
                    </div> 
                    <div className="productInfo">
                        <p className="productName">{name}</p>
                        <h2 className="productDescription">{description}</h2>
                        <p className="productPrice">${price}.00 USD</p>
                        <div className="colorDisplay">
                            {mappedLikeProducts}
                        </div>
                        <p className="currentColor">{color}</p>
                        <div className="selectSize">
                            <p className="select">SELECT SIZE</p>
                            <p className="sizeguide">Size Guide</p>
                        </div>
                        <div className="sizes">
                            <button className="size">S</button>
                            <button className="size">M</button>
                            <button className="size">L</button>
                            <button className="size">XL</button>
                            <button className="size">XXL</button>
                        </div>
                        <button className="addBtn">ADD</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Product;