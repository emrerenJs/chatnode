const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

const User = require('../../models/User');
const appconfig = require('../../app-config.json');

passport.use(new GoogleStrategy({
    clientID: process.env.OAUTH_GOOGLE_LOGIN_CLIENTID,
    clientSecret: process.env.OAUTH_GOOGLE_LOGIN_SECRETID,
    callbackURL: process.env.OAUTH_GOOGLE_LOGIN_CALLBACKURL
}, ((accessToken, refreshToken, profile, done) => {
    const data = profile._json;
    User.findOrCreate({
        'googleId':data.sub
    },{
        name:data.given_name,
        surname:data.family_name,
        profilePhotoUrl:data.picture
    }, (err,user)=>{
        user._doc._expire = Date.now() + appconfig.secureSessionLimit;
        return done(err,user);
    })
})));

passport.serializeUser((user,done)=>{
    done(null,user);
});
passport.deserializeUser((user,done)=>{
    done(null,user);
});

module.exports = passport;