const util = require('util'),
      Promise = require('bluebird')

const Pool = require('./utils/pool')

const pool = new Pool()

const sql = "select userid,username from users;"



Promise.using(pool.connect(), conn =>{
    conn.queryAsync(sql)
        .then(console.log)
        .catch( err => {
            util.log("err >>", err)
        })

    
    pool.end()
    
})