"use strict";

const express = require('express');
const router = express.Router();
const logger = require('../utils/logger');

router.get('/',(req,res, next)=>{

    
    
    
    req.session.destroy(function(err){
        // cannot access session here
        if(err){
            logger.error("로그아웃 에러(session.distory)")        
            //res.redirect('/')
        }
        res.render('index.ejs')
     });

    
});


module.exports = router