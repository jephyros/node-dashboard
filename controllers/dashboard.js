"use strict";
const Promise = require("bluebird");

const pool = require('../utils/pool');
const logger = require('../utils/logger');

//dashboard Get Method
exports.dashboard_get =(req,res, next)=>{


	logger.info('대시보드 Get 호출');
	let resultData ="";
	let sql = "select userid,username,inserttime from users where userid like ?";
	let param = ["%%"];	
	pool.excuteSql(sql,param)
		.then((result)=>{
			   //console.log("2:",new Date(), result); 
			   resultData = result;
			   res.render('dashboard/dashboard.ejs',{data: resultData});
			  
		}).catch(err=>{
            logger.error(err.toString());            
			resultData = [];			
			res.render('dashboard/dashboard.ejs',{data: resultData});
			
		});
	
}