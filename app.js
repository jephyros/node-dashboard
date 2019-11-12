"use strict";
const express  = require('express')      
      ,path = require('path')
      ,morgan = require('morgan')    
      ,moment = require('moment-timezone')
      ,engine = require('ejs-locals')            
      ,app = express();



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
const apiRouters = require('./routes/api');

app.use(morgan('combined', { stream: accessLogStream }))
app.use(express.static('public'));
app.use(express.json())
//app.use(bodyParser().json())
app.set('view engine','ejs');
app.engine('ejs', engine);


//Router
app.use('/',mainRoutes);
app.use('/login',loginRoutes);
app.use('/dashboard',dashboardRoutes);
app.use('/api',apiRouters);


//router error 
app.use((req, res, next) =>{
  const error =new Error("Not found - CustomCIS");
  error.status =404;
  next(error);
});

app.use((error, req, res, next)=>{
  res.status(error.status || 500);
  res.json({
      error: {
          message : error.message
      }
  })
});

module.exports = app;

