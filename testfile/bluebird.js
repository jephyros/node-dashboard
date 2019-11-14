"use strict";
const Promise = require("bluebird");

const pool = require('../utils/pool');

	//========================================== Promist test
	let param1 = ["%cis%"];	
	let param2 = ["%hgd%"];		

	let promiseSql = [];

	for (let i = 1 ; i< 3; i++){
		let str = eval('pool.excuteSql("select userid,username,inserttime from users where userid like ?",param'+ i+  ')');
		promiseSql.push(str);
		//console.log('for loop : ' , str);
	}
	
	Promise.all(promiseSql).then( r=>{
		console.log("promise 1 : ", r[0])
		console.log("promise 2 : ", r[1])

	}).catch( err => {
		console.log("promise Error : ", err)
	});
	//========================================== Promist test