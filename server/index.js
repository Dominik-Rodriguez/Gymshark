require('dotenv').config();

const express = require('express'),
      massive = require('massive'),
      session = require('express-session'),
      {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env,
      prodCtrl = require('./productControllers'),
      authCtrl = require('./logincontroller');
      homeCtrl = require('./homeController');
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
});

//auth endpoints
app.post('/api/login', authCtrl.login);
app.post('/api/register', authCtrl.register);
app.get('/api/logout', authCtrl.logout);

//products endpoints
app.get('/api/mensproducts', prodCtrl.getMensProducts);
app.get('/api/womensproducts', prodCtrl.getWomensProducts);
app.get('/api/accessories', prodCtrl.getAccessories);

//home endpoints
app.get('/api/getMensProducts', homeCtrl.maleHomePage);
app.get('/api/getWomensProducts', homeCtrl.femaleHomePage);

app.listen(SERVER_PORT, () => console.log(`Server is on ${SERVER_PORT}`))