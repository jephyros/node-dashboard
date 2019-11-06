const mysql = require('mysql'),
      util = require('util'),
      Promise = require('bluebird')

Promise.promisifyAll(mysql)
Promise.promisifyAll(require("mysql/lib/Connection").prototype)
Promise.promisifyAll(require("mysql/lib/Pool").prototype)

const DB_INFO = {
    host : "127.0.0.1",
    user : "root",
    password : "123456",
    database : "nodejs",
    port :"3326",
    multipleStatements : true,
    connectionLimit : 5,
    waitForConnections : false
}

module.exports = class {
    constructor(dbinfo){
        dbinfo = dbinfo || DB_INFO
        this.pool = mysql.createPool(dbinfo)
    }

    connect(){
        return this.pool.getConnectionAsync().disposer(conn =>{
            return conn.release()
        })
    }
    end(){
        this.pool.end( err => {
            util.log(">>>>>>>>>> End of Pool !!")
            if(err)
                util.log("Error pool endding!!")
        })
    }


}

    