"use strict";
const express  = require('express');
const session = require('express-session');
const redis = require('redis');
const redisStore = require('connect-redis')(session);
const passport = require('passport');
const path = require('path');
const morgan = require('morgan');
const moment = require('moment-timezone');
const engine = require('ejs-locals');       
const favicon = require('serve-favicon');

//var flash = require('connect-flash');

const passportConfig = require('./utils/passport'); // 여기


const app = express();
const client = redis.createClient(6379,'localhost');

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
const logoutRoutes = require('./routes/logout');
const dashboardRoutes = require('./routes/dashboard');
const mainRoutes = require('./routes/main');
const apiRouters = require('./routes/api');



app.use(morgan('combined', { stream: accessLogStream }))
app.use(favicon('./public/images/favicon.ico'));
app.use(express.static('public'));
//app.use(express.bodyParser());
app.use(express.json())
app.use(express.urlencoded( {extended : false } ));

app.use(session({
  secret: '@#@$MYSIGN#@$#$',
  //Redis서버의 설정정보
  store : new redisStore({
      client: client,
      ttl : 260
  }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 // 쿠키 유효기간 60분
  }
 }));
//passportSetting
app.use(passport.initialize());
app.use(passport.session());
passportConfig();
//세션의 User정보표기

app.use(function(req, res, next) {
  //console.log("ReqSession : ", req.user)  
  res.locals.user = req.user;  
  res.locals.loginwarnmsg = "";  
  next();
});

const isAuthenticated = function (req, res, next) {  
  if (req.isAuthenticated())      
      return next();
      //res.redirect('/login');
      res.render('login/login.ejs',{loginmessage : '해당메뉴에 권한이 없습니다. 로그인이 필요합니다.'});
  };
  
//app.use(flash());

app.set('view engine','ejs');
app.engine('ejs', engine);


//Router
app.use('/',mainRoutes);
app.use('/login',loginRoutes);
app.use('/logout',logoutRoutes);
app.use('/dashboard',isAuthenticated, dashboardRoutes);
app.use('/api',apiRouters);

app.use('*',(req, res, next )=>{
  res.render('Error404.ejs');
});




// //router error 
// app.use((req, res, next) =>{
//   const error =new Error("Not found - CustomCIS");
//   error.status =404;
//   next(error);
// });

// app.use((error, req, res, next)=>{
//   res.status(error.status || 404);  
//   res.render('dashboard/dashboard.ejs');
//   res.json({
//       error: {
//           message : error.message
//       }
//   })
// });

module.exports = app;

