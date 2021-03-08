//packages
/*thirth party*/
const express = require('express');
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');
/*our packages*/
const DatabaseHelper = require('./helpers/database/DatabaseHelper');
const ResponseModel = require('./models/ResponseModel');
const redisStore = require('./helpers/session/redisStore');
/*middlewares*/
const isAuthenticated = require('./middleware/isAuthenticated');
//instances
const app = express();

//configurations
dotenv.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

app.use(cors({
    credentials:true,
    origin:process.env.CLIENT_URL
}));

app.use(expressSession({
    store:redisStore,
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false, /* https : true, http : false */
        maxAge: 1000 * 60 * 2 /*2 minutes*/
    }
}));
app.use(passport.initialize());
app.use(passport.session());
//routes
const SecurityRoute = require('./routes/Security');
const ChatRoute = require('./routes/Chat');

app.use('/security', SecurityRoute);
app.use('/chat',isAuthenticated,ChatRoute);

//db
DatabaseHelper.connect();
module.exports = app;