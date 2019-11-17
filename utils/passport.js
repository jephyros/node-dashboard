const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../utils/pool');
const logger = require('../utils/logger');

module.exports = () =>{

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
    

}

