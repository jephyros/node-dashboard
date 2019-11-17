"use strict";
const express  = require('express');
const session = require('express-session');
const redis = require('redis');
const redisStore = require('connect-redis')(session);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const path = require('path');
const morgan = require('morgan');
const moment = require('moment-timezone');
const engine = require('ejs-locals');       
//var flash = require('connect-flash');


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
passport.serializeUser(function (user, done) {
  done(null, user)
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    session: true, // 세션에 저장 여부
    passReqToCallback: true
  }, function ( req, username, password, done) {
      console.log('>>>>>>>>>>>>>>debug');
      //return done(null, username); // 검증 성공
      if(username === 'cis' && password === '1234'){
        return done(null, {
          'user_id': username,
        });
      }else{
        //return done(false, null)
        return done(null, false, { message: '비밀번호가 틀렸습니다' }); // 임의 에러 처리
      }
  }));


  var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated())
      return next();
    res.redirect('/login');
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

