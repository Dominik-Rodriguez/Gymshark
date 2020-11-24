// const { email } = require('./emailController');

const { orderHistory } = require('./orderHistoryController');

require('dotenv').config();

const express = require('express'),
      path = require('path'),
      massive = require('massive'),
      session = require('express-session'),
      {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET, STRIPE_SECRET_KEY, STRIPE_PUBLIC_KEY} = process.env,
      prodCtrl = require('./productControllers'),
      authCtrl = require('./logincontroller'),
      homeCtrl = require('./homeController'),
      emailCtrl = require('./emailController'),
      OrderCtrl = require('./orderHistoryController');
    //   stripe = require('stripe')(STRIPE_SECRET_KEY),
      invCtrl = require('./inventoryController'),
      stripeCtrl = require('./stripeController');
      app = express();
app.use(express.json());

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {maxAge: 1000 * 60 * 60 * 24}
}));
 
massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
}).then(db => {
    app.set('db', db);
    console.log('You are connected to a db');
    app.listen(SERVER_PORT, () => console.log(`Server is on ${SERVER_PORT}`))
});

app.use(express.static(__dirname + '/../build'));

//THIS IS WHAT CAUSES ISSUES IN TERMS OF HOSTING.
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../build/index.html'))
// })

//auth endpoints
app.post('/api/login', authCtrl.login);
app.post('/api/register', authCtrl.register);
app.get('/api/logout', authCtrl.logout);

//products endpoints
//main page enpoints
app.get('/api/mensproducts', prodCtrl.getMensProducts);
app.get('/api/womensproducts', prodCtrl.getWomensProducts);
app.get('/api/accessories', prodCtrl.getAccessories);

//mens endpoints
app.get('/api/menproduct/:id', prodCtrl.getProduct);
app.get('/api/menlikeproducts/:description', prodCtrl.getMensLikeProducts);
app.get('/api/mendifferentProduct/:id', prodCtrl.getMenDifferentProduct);

//womens endpoints
app.get('/api/womenproduct/:id', prodCtrl.getWomenProduct);
app.get('/api/womenlikeproduct/:description', prodCtrl.getWomensLikeProduct);
app.get('/api/womendifferentProduct/:id', prodCtrl.getWomenDifferentProduct);

//accessory endpoints
app.get('/api/Accessory/:id', prodCtrl.getAccessory);
app.get('/api/differentAccessory/:id', prodCtrl.getDifferentAccessory);
app.get('/api/LikeAccessories/:description', prodCtrl.LikeAccessories);

//home endpoints
app.get('/api/getMensProducts', homeCtrl.maleHomePage);
app.get('/api/getWomensProducts', homeCtrl.femaleHomePage);

//profile endpoints
app.get('/api/OrderHistory', OrderCtrl.orderHistory);
app.get('/api/userInfo', OrderCtrl.userInfo);
app.get('/api/singleOrder/:id', OrderCtrl.singlePurchase);

//email endpoints
app.post('/api/email', emailCtrl.email);

//Stripe Element to handle payment in house
app.post('/api/charge', stripeCtrl.charge);

// app.post('/api/purchasedItems', invCtrl.logOrder);
app.post('/api/orderUserInfo', invCtrl.logOrder);
app.post('/api/purchasedItems', invCtrl.logItems);

//stripe endpoint to take to stripe ui
app.post('/api/payments', async(req,res) => {
    //map over products from redux
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'Thanks for Shopping with Gymshark',
                        images: [
                            "https://pngimg.com/uploads/shopping_cart/shopping_cart_PNG37.png",
                          ],
                    },
                    unit_amount: req.body.price * 100,
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: `http://206.189.215.192:3001/Success`,
        // success_url: `http://localhost:3000/#/Success`,
        // cancel_url: `http://localhost:3000/#/Failure`,
        cancel_url: `http://206.189.215.192:3001/Failure`
    });
    res.json({ id: session.id });
});

// const mapStateToProps = (reduxState) => reduxState;