const Promise = require('bluebird')

module.exports = class {
    constructor(pool){
        this.pool = pool
    }

    execute(callback){
        Promise.using(this.pool.connext(), conn => {
            callback(conn)
        })
    }

    executeTx(callback){
        Promise.using(this.pool.connect(), conn=> {
            conn.beginTransaction( txerr => {
                callback(conn)
            })
        })
    }
    
}
