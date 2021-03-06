const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');
// tell passport to use a new strategy for google login
passport.use(new googleStrategy({
    clientID:"143275123291-8tlu25e64ev6khjouk8mvuoiigla7ap1.apps.googleusercontent.com",
    clientSecret:"oFhtDo4Y8Ruumup6a7eKfICS",
    callbackURL:"http://localhost:8000/users/auth/google/callback"
    },
    // accessing credentials from google
    function(accessToken,refreshToken,profile,done){
        // find a user
        User.findOne({email:profile.emails[0].value}).exec(function(err,user){
            if(err){
                console.log(`Error in google strategy passport : ${err}`);
                return;
            }
            console.log(profile);
            if(user){
                // if found set this user as req.user
                return done(null,user);
            }else{
                // if not found create the user and set it as req.user
                User.create({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    password:crypto.randomBytes(20).toString('hex')
                },function(err,user){
                    if(err){console.log('error in creating google strategy-passport',err);return;}
                    return done(null,user);
                })
            }
        })
    }


));