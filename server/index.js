require('dotenv').config();

const express = require('express'),
      path = require('path'),
      massive = require('massive'),
      session = require('express-session'),
      {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env,
      prodCtrl = require('./productControllers'),
      authCtrl = require('./logincontroller'),
      homeCtrl = require('./homeController'),
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
