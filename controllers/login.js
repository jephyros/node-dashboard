"use strict";



const pool = require('../utils/pool')
const logger = require('../utils/logger');


//로그인 화면 
exports.login_get = (req,res, next)=>{
	res.render('login/login.ejs',{loginmessage : ''});
	
}


//회원가입
exports.signup_get =(req,res, next)=>{
	
	
	res.render('login/signup.ejs')
	
}

//마이페이지
exports.mypage_get = (req,res, next)=>{

	logger.info('마이페이지 Get 호출');
	//console.log('userinfo',req.user.username);
	
	//console.log("session: " ,req.user.userid)
	let sql = "select userid,username,email from users where userid = ?";
	let param = [req.user.userid];	
	pool.excuteSql(sql,param)
		.then((result)=>{			   
			   res.render('login/mypage.ejs',{data : result[0]});
			  
		}).catch(err=>{
            logger.error(err.toString());            
			res.render('login/mypage.ejs',{data : err});
			
			
		});
	

	
	
}
