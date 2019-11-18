"use strict";
const Promise = require("bluebird");

const pool = require('../../utils/pool');
const logger = require('../../utils/logger');
const utils = require('../../utils/utils');

//회원가입 Method
exports.signup_post = (req,res, next)=>{
	
	logger.info('Signup 처리 컨트롤러 호출 ');
	//console.log(req.body);
	
	let userid = req.body.userid;
	let username = req.body.username;
	let email = req.body.useremail;
	let password = req.body.password;
	
	//4개값 필수 체크
	var checkval = function () {		
		return new Promise(function(resolve,rejected){
			if( userid =='' || username =='' || email =='' || password ==''){
				resolve(false);
				// res.status(400).json({
				// 	resultcode : "400",
				// 	resultmsg : "BadRequest"
				// });
		
			}else{
				resolve(true);
			}
		});
		
	}

	//  var sql = "select count(*) cnt from  users where userid =?";
	//  var param = [userid];	
	//  pool.excuteSql(sql,param).then((result)=>console.log(result));
		
		
	function save() {

		//아이디 중복 체크 
	var sql = "select count(*) cnt from  users where userid =?";
	var param = [userid];	
	pool.excuteSql(sql,param)
		.then((result)=>{
			//console.log(result[0].cnt);
			if (result[0].cnt > 0){
				res.status(200).json({
					resultcode : "E01",
					resultmsg : "DupulicateID"
				});			
			}//아이디중복이아니면 
			else{
				var sql = "insert into users (userid,username,email,password,inserttime) values(?,?,?,?,now())";
				var param = [userid,username,email,utils.encryptSHA2(password)];	
				pool.excuteSqlTx(sql,param)
					.then((result)=>{

						//console.log(result);

						res.status(200).json({
							resultcode : "200",
							resultmsg : "success"
						});			
						
					}).catch(err=>{
						logger.error(err.toString());            
						res.status(500).json({
							resultcode : "500",
							resultmsg : "save Error"
						});
						
					});

			}
			
			
		}).catch(err=>{
			logger.error(err.toString());            
			res.status(500).json({
				resultcode : "500",
				resultmsg : "save Error"
			});
			
		});


	}
	

	var check = checkval();
	//var saveexe =
	check.then(result =>{
		//console.log(result);
		if (result == true){
			save()
		}else{
			res.status(400).json({
			resultcode : "400",
			resultmsg : "BadRequest"
		});
		}

	}).catch(err=>{
		res.status(500).json({
			resultcode : "500",
			resultmsg : err
		});
	});
	
}


//마이페이지수정 Post Method
exports.mypage_post = (req,res, next)=>{
	
	logger.info('Signup 처리 컨트롤러 호출 ');
	//console.log(req.body);
	
	let userid = req.body.userid;
	let username = req.body.username;
	let email = req.body.useremail;
	let password = req.body.password;
	
	//4개값 필수 체크
	var checkval = function () {		
		return new Promise(function(resolve,rejected){
			if( userid =='' || username =='' || email =='' || password ==''){
				resolve(false);
				// res.status(400).json({
				// 	resultcode : "400",
				// 	resultmsg : "BadRequest"
				// });
		
			}else{
				resolve(true);
			}
		});
		
	}

		
	function save() {

	
		var sql = "update users set username =?, email = ?,password = ? where userid =?";
		var param = [username,email,utils.encryptSHA2(password),userid];	
		pool.excuteSqlTx(sql,param)
			.then((result)=>{

				//console.log(result);

				res.status(200).json({
					resultcode : "200",
					resultmsg : "success"
				});			
				
			}).catch(err=>{
				logger.error(err.toString());            
				res.status(500).json({
					resultcode : "500",
					resultmsg : "save Error"
				});
				
			});

			

	}
	

	var check = checkval();
	//var saveexe =
	check.then(result =>{
		//console.log(result);
		if (result == true){
			save()
		}else{
			res.status(400).json({
			resultcode : "400",
			resultmsg : "BadRequest"
		});
		}

	}).catch(err=>{
		res.status(500).json({
			resultcode : "500",
			resultmsg : err
		});
	});
	
}
