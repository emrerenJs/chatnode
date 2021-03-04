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
    origin:"http://localhost:3000"
}));

app.use(expressSession({
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

app.post('/isLoggedIn', (req, res) => {
    if(!req.user){
        res.json(ResponseModel.unAuthorized());
    }else{
        res.redirect(ResponseModel.ok());
    }
});
app.use('/security', SecurityRoute);
app.use('/chat',isAuthenticated,ChatRoute);

//server settings
const PORT = process.env.PORT || 3001;
DatabaseHelper.connect();

app.listen(PORT, () => {
    console.log(`${PORT} listening..`);
})