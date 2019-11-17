"use strict";


const util = require('util');
const pool = require('../utils/pool')


//로그인 화면 처리
exports.login_get = (req,res, next)=>{

	res.render('login/login.ejs',{loginmessage : ''});
	
}
//로그인 처리
exports.login_post = (req, res, next) =>{

}
//회원가입
exports.signup_get =(req,res, next)=>{
	
	var session =req.session;

	let username = session.username;
	res.render('login/signup.ejs',{data:username})
			  
	
}
