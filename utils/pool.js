"use strict";

const mysql = require('mysql2/promise')
 
const opts = {
    host:'localhost',
    user:'root',
	password:'123456',
	port: 3326,
	database:'nodejs',
	connectionLimit: 50
	
}

const pool = mysql.createPool(opts);




module.exports.excuteSql =  async function(sql,params) {
    
	try{
		const connection = await pool.getConnection(async conn=>conn);
		try{			
			const [rows] = await connection.query(sql,params);			
			connection.release();
			return rows;
		}catch(e1){			
			connection.release();
			//console.log('Query Error!'+ e1);
			throw new Error("connection.query :" + e1);
			
		}
	}catch(e2){
		//console.log('DB Connection Error!');
		throw new Error("pool.getConnection : " + e2);
		
		
	}
	
        
};


module.exports.excuteSqlTx =  async function(sql,params) {
    
	try{
		const connection = await pool.getConnection(async conn=>conn);
		try{
			
			await connection.beginTransaction();
			const [rows] = await connection.query(sql,params);

			await connection.commit();
			connection.release();
			return rows;
		}catch(e1){
			await connection.rollback();
			connection.release();
			//console.log('Query Error!');
			throw new Error("connection.query :" + e1);
			
		}
	}catch(e2){
		//console.log('DB Connection Error!');
		throw new Error("pool.getConnection : " + e2);		
		
	}
	
        
};
 
 

 
// var sql = 'select userid,username,inserttime from users where userid=?';
// var param = ["cis"]
// var sql2 = 'select userid,username,inserttime from users where userid=?';
// var param2 = ["hgd"]

// var sql3 = 'select userid,username,inserttime from users where userid=?';
// var param3 = ["lss"]

// excuteSql(sql,param)
// 	.then((res)=>{
// 		   console.log("1:", res); 
// 		   return excuteSql(sql2,param2)
// 	})
// 	.then((res)=>{
// 		console.log("2:", res); 
// 		return excuteSql(sql3,param3)
//  	})
// 	.then((res)=>{
// 		console.log("3:", res); 
// 	}).catch(err=>{
// 		console.log("err : ", err)
// 	});

