var Sequelize = require('sequelize');
var models = require('../models');
var sequelize = require("sequelize");

var LocalStrategy   = require('passport-local').Strategy;

module.exports = function(passport){
     passport.serializeUser(function(user, done) {
          done(null, user.id);
     });
     // get user's credentials from session
     passport.deserializeUser(function(id, done) {
          done(null, id);
     });


     passport.use('local-signup', new LocalStrategy({
          // by default, local strategy uses username and password, we will override with email
          usernameField: 'email',
          passwordField: 'password',
          passReqToCallback: true // allows us to pass back the entire request to the callback
     },
     function(req, email, password, done) {
          models.User.findOne({
               where: {
                    email: req.body.email
               }
          }).then(function(user, err) {
               if(err) {
                    console.log(err);
                    return done(null, false);
               }
               if(user == null) {
                    models.User.create({
                         firstName: req.body.firstName,
                         lastName: req.body.lastName,
                         email: req.body.email,
                         password: req.body.password
                    }).then(function(user) {
                         return done(null, user);
                    }).catch(function(err) {
                         return done(null, err);
                    });
               }

               if(user){
                    return done(null, false);
               }

          })

     }));

     passport.use('local-signin', new LocalStrategy({
          // by default, local strategy uses username and password, we will override with email
          usernameField: 'email',
          passwordField: 'password',
          passReqToCallback: true // allows us to pass back the entire request to the callback
     },
     function(req, username, password, done) {
          models.User.findOne({
               where: {
                    email: req.body.email,
                    password: req.body.password
               }
          }).then(function(user, err) {
               if(err) {
                    console.log(err);
                    return done(null, false);
               }
               if(user == null) {
                    return done(null, false);
               }
               if(user){
                    return done(null, user);
               }
          })

     }));
}
