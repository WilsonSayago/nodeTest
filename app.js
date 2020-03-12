const express = require('express');
const bodyParser = require('body-parser');
const userRoute = require('./routes/user');
const oauthRoute = require('./routes/oauth');
const oauthMiddleware = require('./middleware/oauth');

//const db = require('./util/database');
const app = express();

// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


//Add Routes
app.use('/users', oauthMiddleware, userRoute);
app.use(oauthRoute);

app.listen(3000);