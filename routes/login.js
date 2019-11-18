"use strict";

const express = require('express');
const router = express.Router();
const passport = require('passport');

const LoginController = require('../controllers/login');

router.get('/',LoginController.login_get);
router.post('/', passport.authenticate('local', {
    //successRedirect: '/login/loginSuccess',
    failureRedirect: '/login/loginFailure'
    }), (req, res) => {
        console.log('Login success.')
        res.redirect('/');
      });

router.get('/loginFailure', (req,res,next)=>{    
    res.render('login/login.ejs',{loginmessage : '아이디와비번을 확인하세요'});
    
    
});

router.get('/signup',LoginController.signup_get);

module.exports = router