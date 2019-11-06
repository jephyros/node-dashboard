const express = require('express');
const router = express.Router();

//const LoginController = 

router.get('/',(req,res, next)=>{
	res.status(200).json({
		message : 'loginpage'
	})
})

module.exports = router