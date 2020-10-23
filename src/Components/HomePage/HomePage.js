import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

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
                {mappedFemale}
                {mappedMale}
            </div>
        )
    }

}

export default HomePage;