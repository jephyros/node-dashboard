const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const utils = require('../utils/utils');
const pool = require('../utils/pool');
const logger = require('../utils/logger');

module.exports = () =>{

    passport.serializeUser(function (user, done) {
        done(null, user)
    });
      
    passport.deserializeUser(function (user, done) {
        
        let sql = "select userid,username,email from users where userid = ?";
        let param = [user.user_id];	
        //console.log("userinfo1 : ", user.user_name);
        pool.excuteSql(sql,param)
          .then((result)=>{    
            //console.log("userinfo : ", result[0]);
            done(null, result[0]);        
              
          }).catch(err=>{
            done(null, user);          
            
          });

    });
      

    passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        session: true, // 세션에 저장 여부
        passReqToCallback: true
      }, function ( req, username, password, done) {


        
        let sql = "select userid,username,password from users where userid = ?";
        let param = [username];	
        pool.excuteSql(sql,param)
          .then((result)=>{              
              if(username === result[0].userid && utils.encryptSHA2(password) === result[0].password){
                return done(null, {
                  'user_id': username,
                  'user_name': result.username
                });
              }else{
                //return done(false, null)
                logger.info("로그인 실패 ID : '"+ username+ "'");  
                return done(null, false, { message: '비밀번호가 틀렸습니다' }); // 임의 에러 처리
              }
              
              
          }).catch(err=>{
                  logger.error(err.toString());            
            
            return done(null, false, { message: '비밀번호가 틀렸습니다' }); // 임의 에러 처리
            
          });
          
          
          
          
    }));
    

}

