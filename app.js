"use strict";
const express  = require('express')
      ,fs = require('fs')
      ,path = require('path')
      ,morgan = require('morgan')    
      ,moment = require('moment-timezone')
      ,engine = require('ejs-locals')      
      ,app = express();

// AccessLog(morgan) Setting =======
// const accessLogStream =  fs.createWriteStream(
//     path.join(__dirname, 'logs', 'access.log'),
//     { flags: 'a' }
// );
const accessLogStream =  require('file-stream-rotator').getStream({
    filename: path.join(__dirname,'logs', 'access_%DATE%.log'),
    frequency: 'daily',
    verbose: false,
    date_format: 'YYYYMMDD'
  });

morgan.token('date', (req, res) => {
    return moment().tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss.SSS ZZ');
})
morgan.format('myformat', '[:date] ":method :url" :status :res[content-length] - :response-time ms');
// =================================================
const loginRoutes = require('./routes/login');
const dashboardRoutes = require('./routes/dashboard');
const mainRoutes = require('./routes/main');

app.use(morgan('combined', { stream: accessLogStream }))
app.use(express.static('public'));
app.set('view engine','ejs');
app.engine('ejs', engine);

//Router
app.use('/',mainRoutes);
app.use('/login',loginRoutes);
app.use('/dashboard',dashboardRoutes);


module.exports = app;

