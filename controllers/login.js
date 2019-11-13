"use strict";


const util = require('util');
const pool = require('../utils/pool')


//dashboard Get Method
exports.login_get =(req,res, next)=>{
	
	//session test 
	var session =req.session;
	session.username = "cis";

	
	let resultData ="";
	let sql = "select userid,username,inserttime from users where userid like ?";
	let param = ["%%"];	
	pool.excuteSql(sql,param)
		.then((result)=>{
			   //console.log("2:",new Date(), result); 
			   resultData = result;
			   res.render('login/login.ejs',{data: resultData})
			  
		}).catch(err=>{
			util.log(err)
			resultData = [];			
			res.render('login/login.ejs',{data: resultData})
			
		});
	
}
//회원가입
exports.signup_get =(req,res, next)=>{
	
	var session =req.session;

	let username = session.username;
	res.render('login/signup.ejs',{data:username})
			  
	
}
