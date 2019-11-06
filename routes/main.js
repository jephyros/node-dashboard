const express = require('express');
const router = express.Router();
``
//const LoginController = 

router.get('/',(req,res, next)=>{
	res.render('index.ejs',{"name" : "CIS", "title":"test title"})
})

module.exports = router