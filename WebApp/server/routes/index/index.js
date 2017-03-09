var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize');
var models = require('../../models');
var sequelize = require("sequelize");
// var passport = require('passport');
var passport = require('passport');
require('../../config/passport.js')(passport);

// var bCrypt = require('bcrypt-nodejs');

// get homepage
router.get('/', function(req, res) {
     res.render('./index');
});

router.post('/signup', function(req, res, next) {
     passport.authenticate('local-signup',{session: true}, function(err, user, info) {
          if(user){
               req.logIn(user, function(err) {
                    if (err) {
                         return next(err);
                    } else {
                         res.send({
                              success: true,
                              response: 'signup successful'
                         });
                    }
               });
          }
          if(!user){
               res.send({
                    success: false,
                    response: 'This username or email has already exist'
               });
          }

          if(err){
               res.send({
                    success: false,
                    response: 'Sign Up failed'
               })
          }
     })(req, res, next);
});

router.post('/login', function(req, res, next) {
     passport.authenticate('local-signin',{session: true}, function(err, user, info) {
          if(user){
               req.logIn(user, function(err) {
                    if (err) {
                         return next(err);
                    } else {
                         res.send({
                              success: true,
                              response: 'login successful'
                         });
                    }
               });
          }
          if(!user){
               res.send({
                    success: false,
                    response: 'Authentication Failed'
               });
          }

          if(err){
               res.send({
                    success: false,
                    response: 'Authentication failed'
               })
          }
     })(req, res, next);
});

var isValidPassword = function(user, password){
     return bCrypt.compareSync(password, user.password);
}

router.get('/isLogin', function(req, res) {
     if (req.isAuthenticated()){
          res.send({
               success: true,
               msg: "You are logged in"
          });
     }else{
          res.send({
               success: false,
               msg: "You are NOT logged in"
          });
     }
})

router.get('/logout', function(req, res) {
     req.logout();
     req.session.destroy();
     res.send({
          success: true,
          msg: "Logout successfully"
     });

});

module.exports = router;
