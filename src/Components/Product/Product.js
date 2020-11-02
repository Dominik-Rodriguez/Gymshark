import React from "react";
import axios from "axios";
import "./Product.scss";
import { Link } from "react-router-dom";
import { addToCart } from "../../redux/reducer";
import { connect } from "react-redux";

class Product extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      product: {},
      likeProducts: [],
      item: {}
    };
  }

  componentDidMount() {
    this.getProduct();
  }

  getProduct = () => {
    axios
      .get(`/api/menproduct/${this.props.match.params.id}`)
      .then((res) =>{    
        this.setState({ product: res.data, item: {...res.data, quantity: 1} }, () => {
          this.getLikeProducts();
        })}
      )
      .catch((err) => console.log(err));
  };

  getDifferentProduct = (i) => {
    const target_id = this.state.likeProducts[i].item_id;
    axios
      .get(`/api/mendifferentProduct/${target_id}`)
      .then((res) => this.setState({ product: res.data, item: {...res.data, quantity: 1} }))
      .catch((err) => console.log(err));
  };

  getLikeProducts = () => {
    axios
      .get(`/api/menlikeproducts/${this.state.product.description}`)
      .then((res) => this.setState({ likeProducts: res.data }))
      .catch((err) => console.log(err));
  };

  setS = () => {
    this.setState({ item: { ...this.state.item, size: "small" } });
  };

  setM = () => {
    this.setState({ item: { ...this.state.item, size: "medium" } });
  };

  setL = () => {
    this.setState({ item: { ...this.state.item, size: "large" } });
  };

  setXL = () => {
    this.setState({ item: { ...this.state.item, size: "extra-large" } });
  };

  setXXL = () => {
    this.setState({ item: { ...this.state.item, size: "2x-large" } });
  };

  setValues = () => {
    let productItem_id = this.state.product.item_id;
    let productPrice = this.state.product.price;
    this.setState({
      item: {
        ...this.state.item,
        quantity: 1,
        item_id: productItem_id,
        price: productPrice,
      },
    }, () => console.log(this.state));
    this.addItem();
  };

  addItem = () => {
    this.props.addToCart({ ...this.state.item });
  };

  render() {
    const {
      color,
      description,
      img,
      item_id,
      name,
      price,
    } = this.state.product;

    const mappedLikeProducts = this.state.likeProducts.map((product, i) => (
      <div className="MPlikeProductPhotos">
        <a>
          <img
            src={product.img}
            alt="item like image"
            className="MPlikeProductImage"
            onClick={() => {
              this.getDifferentProduct(i);
            }}
          />{" "}
        </a>
      </div>
    ));
    console.log(this.props);
    return (
      <div className="Product">
        <div className="productBox">
          <div className="left-side">
            <p className="hometxt">
              <Link to="/" className="links">
                HOME
              </Link>{" "}
              - {description} - {color}
            </p>
            <img src={img} alt="product image" className="productImage" />
          </div>
          <div className="MPproductInfo">
            <p className="productName">{name}</p>
            <h2 className="productDescription">{description}</h2>
            <p className="productPrice">${price}.00 USD</p>
            <div className="colorDisplay">{mappedLikeProducts}</div>
            <p className="currentColor">{color}</p>
            <div className="selectSize">
              <p className="select">SELECT SIZE</p>
              <p className="sizeguide">Size Guide</p>
            </div>
            <div className="MPsizes">
              <button onClick={this.setS} className="size">
                S
              </button>
              <button onClick={this.setM} className="size">
                M
              </button>
              <button onClick={this.setL} className="size">
                L
              </button>
              <button onClick={this.setXL} className="size">
                XL
              </button>
              <button onClick={this.setXXL} className="size">
                XXL
              </button>
            </div>
            <button onClick={this.setValues} className="MPaddBtn">
              ADD
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapPropsToState = (reduxState) => reduxState;

export default connect(mapPropsToState, { addToCart },)(Product);
