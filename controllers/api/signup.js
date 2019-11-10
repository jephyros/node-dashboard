"use strict";
const pool = require('../../utils/pool');
const logger = require('../../utils/logger');

//dashboard Get Method
exports.signup_post =(req,res, next)=>{
	
	logger.info('Signup 처리 컨트롤러 호출 ');
	console.log(req);
	res.status(400).json({
		resultcode : "200",
		resultmsg : "success"
	});
	
}