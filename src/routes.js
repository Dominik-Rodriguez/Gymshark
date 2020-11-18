import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from './Components/HomePage/HomePage';
import Product from './Components/Product/Product';
import MensProducts from './Components/Products/MensProducts';
import Cart from './Components/Cart/Cart';
import Login from './Components/Login/Login';
import WomensProducts from './Components/Products/WomensProducts';
import Accessories from './Components/Accessories/Accessories';
import WomenProduct from './Components/WomenProduct/WomenProduct';
import Accessory from './Components/Accessories/Accessory';
import Success from './Components/StripeOutcomes/success';
import Failure from './Components/StripeOutcomes/failure';
import Payments from './Components/StripeElements/Payments';

export default(
    <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/mensproducts' component={MensProducts} />
        <Route path='/womensproducts' component={WomensProducts} />
        <Route path='/accessories' component={Accessories} />
        <Route path='/menproduct/:id' component={Product} />
        <Route path='/womenproduct/:id' component={WomenProduct} />
        <Route path='/accessory/:id' component={Accessory} />
        <Route path='/cart' component={Cart} />
        <Route path="/Login" component={Login}/> 
        <Route path="/Success" component={Success} />
        <Route path='/Failure' component={Failure} />
        <Route path="/Payment" component={Payments} />
    </Switch>
)