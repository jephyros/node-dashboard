const mysql = require('mysql2/promise');
 
var opts = {
    host:'localhost',
    user:'root',
	password:'123456',
	port: 3326,
    database:'nodejs'
};
function generateQuickGuid() {
    return Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
}
const pool = mysql.createPool(opts);
function getRandomInt(min, max){
    return Math.floor(Math.random() * (max - min)) + min;
}
const excuteSql = async(sql,params)=>{
    try{
        const user_id = getRandomInt(0, 1000);
        const access_token = generateQuickGuid();
        //방법3 
        try{
            const connection = await pool.getConnection(async conn=>conn);
            try{
                
                //await connection.beginTransaction();
                const [rows] = await connection.query(sql,params);
                //await connection.commit();
                connection.release();
                return rows;
            }catch(err){
                //await connection.rollback();
                connection.release();
                console.log('Query Error!');
                return false;
            }
        }catch(err){
            console.log('DB ERROR');
            return false;
        }
        
        
        
    }catch(err){
        console.log('DB ERROR!');
        return false;
    }    
};
 
 
var sql = 'select userid,username,inserttime from users where userid=?';
var param = ["cis"]
var sql2 = 'select userid,username,inserttime from users where userid=?';
var param2 = ["hgd"]

var sql3 = 'select userid,username,inserttime from users';
var param3 = []

excuteSql(sql,param)
	.then((res)=>{
		   console.log("1:", res); 
		   return excuteSql(sql2,param2)
	})
	.then((res)=>{
		console.log("2:", res); 
		return excuteSql(sql3,param3)
 	})
	.then((res)=>{
		console.log("3:", res); 
	});

