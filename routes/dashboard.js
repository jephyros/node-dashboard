const express = require('express');
const router = express.Router();

const Mydb = require('../utils/mydb')

//const LoginController = 



router.get('/',(req,res, next)=>{
	// let mydb = new Mydb(pool);
	// let users = "cis"
	let name = ""
	// mydb.execute(conn => {
	// 	conn.query("select userid,username from users where userid=?",[users], (err,row )=> {
	// 		name = row[0].username
	// 	})
	// })	

	res.render('dashboard/dashboard.ejs',{data: name})
})

module.exports = router