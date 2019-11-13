"use strict";

const express = require('express');
const router = express.Router();
const logger = require('../utils/logger');

router.get('/',(req,res, next)=>{

    var session =req.session;

    let username = session.username;
    
    console.log("sessionname : " ,username);
    req.session.destroy(function(err){
        // cannot access session here
        if(err){
            logger.info("로그아웃 에러(session.distory")
            //res.redirect('/')
        }
        res.render('index.ejs')
     });

    
});


module.exports = router