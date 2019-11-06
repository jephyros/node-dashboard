const express = require('express');
const router = express.Router();

const pool = require('../utils/pool')


//const LoginController = 



router.get('/',(req,res, next)=>{
	
	
	let resultData ="";
	let sql = 'select userid,username,inserttime from users where userid=?';
	let param = ["cis"];	
	pool(sql,param)
		.then((result)=>{
			   console.log("2:",new Date(), result); 
			   resultData = result[0].username;
			   res.render('dashboard/dashboard.ejs',{data: resultData})
			  
		}).catch(err=>{
			console.log("err : ", err)
			resultData = "Error";			
			res.render('dashboard/dashboard.ejs',{data: resultData})
			
		});
	
	
	
	// mydb.execute(conn => {
	// 	conn.query("select userid,username from users where userid=?",[users], (err,row )=> {
	// 		name = row[0].username
	// 	})
	// })	

	
})

module.exports = router