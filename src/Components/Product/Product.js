import React from 'react';
import axios from 'axios';
import './Product.scss';
import {Link} from 'react-router-dom';
import {addToCart} from '../../redux/reducer';
import {connect} from 'react-redux';

class Product extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            product: {},
            likeProducts: [],
            item:{
                quantity: 0,
                item_id: 0,
                price: 0,
                size: ''
            }
        }
    }

    componentDidMount(){
        this.getProduct();
    }

    getProduct = () => {
        axios.get(`/api/menproduct/${this.props.match.params.id}`)
        .then(res => this.setState({product: res.data}, () => {
            this.getLikeProducts();
        }))
        .catch(err => console.log(err));
    }

    getDifferentProduct = (i) => {
        const target_id = this.state.likeProducts[i].item_id;
        axios.get(`/api/mendifferentProduct/${target_id}`)
        .then(res => this.setState({product: res.data}))
        .catch(err => console.log(err));
    }
    
    getLikeProducts = () => {
        axios.get(`/api/menlikeproducts/${this.state.product.description}`)
        .then(res =>this.setState({likeProducts: res.data}))
        .catch(err => console.log(err));
    }

    setS = () => {
        this.state.item.size = 'small';
    }

    setM = () => {
        this.state.item.size = 'medium';

    }

    setL = () => {
        this.state.item.size = 'large';
    }

    setXL = () => {
        this.state.item.size = 'extra-large';
    }

    setXXL = () => {
        this.state.item.size = '2x-large';
    }

    setValues = () => {
        const {quantity, item_id, price} = this.state.item;
        // const {item_id, price} = this.state.product;
        quantity = quantity + 1;
        item_id = this.state.product.item_id;
        price = this.state.product.price;
        console.log(this.state.item);
    }

    addItem = () => {
        this.props.addToCart({...this.state.item})
    }
    
    render(){
        const {color, description, img, item_id, name, price} = this.state.product;

        const mappedLikeProducts = this.state.likeProducts.map((product, i) => (
                <div className="likeProductPhotos">
                    <a><img src={product.img} alt="item like image" className="likeProductImage" onClick={()=>{this.getDifferentProduct(i)}} /> </a>
                </div>
        ))
        console.log(this.state.item);
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
                            <button onClick={this.setS} className="size">S</button>
                            <button onClick={this.setM} className="size">M</button>
                            <button onClick={this.setL} className="size">L</button>
                            <button onClick={this.setXL} className="size">XL</button>
                            <button onClick={this.setXXL} className="size">XXL</button>
                        </div>
                        <button onClick={this.setValues, this.addItem} className="addBtn">ADD</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default  connect(null, {addToCart})(Product);