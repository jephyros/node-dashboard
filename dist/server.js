/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app.js":
/*!****************!*\
  !*** ./app.js ***!
  \****************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(__dirname) {\r\nconst express  = __webpack_require__(/*! express */ \"express\");\r\nconst session = __webpack_require__(/*! express-session */ \"express-session\");\r\nconst redis = __webpack_require__(/*! redis */ \"redis\");\r\nconst redisStore = __webpack_require__(/*! connect-redis */ \"connect-redis\")(session);\r\nconst passport = __webpack_require__(/*! passport */ \"passport\");\r\nconst path = __webpack_require__(/*! path */ \"path\");\r\nconst morgan = __webpack_require__(/*! morgan */ \"morgan\");\r\nconst moment = __webpack_require__(/*! moment-timezone */ \"moment-timezone\");\r\nconst engine = __webpack_require__(/*! ejs-locals */ \"ejs-locals\");       \r\nconst favicon = __webpack_require__(/*! serve-favicon */ \"serve-favicon\");\r\n\r\n//var flash = require('connect-flash');\r\n\r\nconst passportConfig = __webpack_require__(/*! ./utils/passport */ \"./utils/passport.js\"); // 여기\r\n\r\n\r\nconst app = express();\r\nconst client = redis.createClient(6379,'localhost');\r\n\r\nconst accessLogStream =  __webpack_require__(/*! file-stream-rotator */ \"file-stream-rotator\").getStream({\r\n    filename: path.join(__dirname,'logs', 'access_%DATE%.log'),\r\n    frequency: 'daily',\r\n    verbose: false,\r\n    date_format: 'YYYYMMDD'\r\n  });\r\n\r\nmorgan.token('date', (req, res) => {\r\n    return moment().tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss.SSS ZZ');\r\n})\r\nmorgan.format('myformat', '[:date] \":method :url\" :status :res[content-length] - :response-time ms');\r\n// =================================================\r\nconst loginRoutes = __webpack_require__(/*! ./routes/login */ \"./routes/login.js\");\r\nconst logoutRoutes = __webpack_require__(/*! ./routes/logout */ \"./routes/logout.js\");\r\nconst dashboardRoutes = __webpack_require__(/*! ./routes/dashboard */ \"./routes/dashboard.js\");\r\nconst mainRoutes = __webpack_require__(/*! ./routes/main */ \"./routes/main.js\");\r\nconst apiRouters = __webpack_require__(/*! ./routes/api */ \"./routes/api.js\");\r\n\r\n\r\n\r\napp.use(morgan('combined', { stream: accessLogStream }))\r\napp.use(favicon('./public/images/favicon.ico'));\r\napp.use(express.static('public'));\r\n//app.use(express.bodyParser());\r\napp.use(express.json())\r\napp.use(express.urlencoded( {extended : false } ));\r\n\r\napp.use(session({\r\n  secret: '@#@$MYSIGN#@$#$',\r\n  //Redis서버의 설정정보\r\n  store : new redisStore({\r\n      client: client,\r\n      ttl : 260\r\n  }),\r\n  resave: false,\r\n  saveUninitialized: false,\r\n  cookie: {\r\n    maxAge: 1000 * 60 * 60 // 쿠키 유효기간 60분\r\n  }\r\n }));\r\n//passportSetting\r\napp.use(passport.initialize());\r\napp.use(passport.session());\r\npassportConfig();\r\n//세션의 User정보표기\r\n\r\napp.use(function(req, res, next) {\r\n  //console.log(\"ReqSession : \", req.user)  \r\n  res.locals.user = req.user;  \r\n  res.locals.loginwarnmsg = \"\";  \r\n  next();\r\n});\r\n\r\nconst isAuthenticated = function (req, res, next) {  \r\n  if (req.isAuthenticated())      \r\n      return next();\r\n      //res.redirect('/login');\r\n      res.render('login/login.ejs',{loginmessage : '해당메뉴에 권한이 없습니다. 로그인이 필요합니다.'});\r\n  };\r\n  \r\n//app.use(flash());\r\n\r\napp.set('view engine','ejs');\r\napp.engine('ejs', engine);\r\n\r\n\r\n//Router\r\napp.use('/',mainRoutes);\r\napp.use('/login',loginRoutes);\r\napp.use('/logout',logoutRoutes);\r\napp.use('/dashboard',isAuthenticated, dashboardRoutes);\r\napp.use('/api',apiRouters);\r\n\r\napp.use('*',(req, res, next )=>{\r\n  res.render('Error404.ejs');\r\n});\r\n\r\n\r\n\r\n\r\n// //router error \r\n// app.use((req, res, next) =>{\r\n//   const error =new Error(\"Not found - CustomCIS\");\r\n//   error.status =404;\r\n//   next(error);\r\n// });\r\n\r\n// app.use((error, req, res, next)=>{\r\n//   res.status(error.status || 404);  \r\n//   res.render('dashboard/dashboard.ejs');\r\n//   res.json({\r\n//       error: {\r\n//           message : error.message\r\n//       }\r\n//   })\r\n// });\r\n\r\nmodule.exports = app;\r\n\r\n\n/* WEBPACK VAR INJECTION */}.call(this, \"/\"))\n\n//# sourceURL=webpack:///./app.js?");

/***/ }),

/***/ "./controllers/api/login.js":
/*!**********************************!*\
  !*** ./controllers/api/login.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nconst Promise = __webpack_require__(/*! bluebird */ \"bluebird\");\r\n\r\nconst pool = __webpack_require__(/*! ../../utils/pool */ \"./utils/pool.js\");\r\nconst logger = __webpack_require__(/*! ../../utils/logger */ \"./utils/logger.js\");\r\nconst utils = __webpack_require__(/*! ../../utils/utils */ \"./utils/utils.js\");\r\n\r\n//회원가입 Method\r\nexports.signup_post = (req,res, next)=>{\r\n\t\r\n\tlogger.info('Signup 처리 컨트롤러 호출 ');\r\n\t//console.log(req.body);\r\n\t\r\n\tlet userid = req.body.userid;\r\n\tlet username = req.body.username;\r\n\tlet email = req.body.useremail;\r\n\tlet password = req.body.password;\r\n\t\r\n\t//4개값 필수 체크\r\n\tvar checkval = function () {\t\t\r\n\t\treturn new Promise(function(resolve,rejected){\r\n\t\t\tif( userid =='' || username =='' || email =='' || password ==''){\r\n\t\t\t\tresolve(false);\r\n\t\t\t\t// res.status(400).json({\r\n\t\t\t\t// \tresultcode : \"400\",\r\n\t\t\t\t// \tresultmsg : \"BadRequest\"\r\n\t\t\t\t// });\r\n\t\t\r\n\t\t\t}else{\r\n\t\t\t\tresolve(true);\r\n\t\t\t}\r\n\t\t});\r\n\t\t\r\n\t}\r\n\r\n\t//  var sql = \"select count(*) cnt from  users where userid =?\";\r\n\t//  var param = [userid];\t\r\n\t//  pool.excuteSql(sql,param).then((result)=>console.log(result));\r\n\t\t\r\n\t\t\r\n\tfunction save() {\r\n\r\n\t\t//아이디 중복 체크 \r\n\tvar sql = \"select count(*) cnt from  users where userid =?\";\r\n\tvar param = [userid];\t\r\n\tpool.excuteSql(sql,param)\r\n\t\t.then((result)=>{\r\n\t\t\t//console.log(result[0].cnt);\r\n\t\t\tif (result[0].cnt > 0){\r\n\t\t\t\tres.status(200).json({\r\n\t\t\t\t\tresultcode : \"E01\",\r\n\t\t\t\t\tresultmsg : \"DupulicateID\"\r\n\t\t\t\t});\t\t\t\r\n\t\t\t}//아이디중복이아니면 \r\n\t\t\telse{\r\n\t\t\t\tvar sql = \"insert into users (userid,username,email,password,inserttime) values(?,?,?,?,now())\";\r\n\t\t\t\tvar param = [userid,username,email,utils.encryptSHA2(password)];\t\r\n\t\t\t\tpool.excuteSqlTx(sql,param)\r\n\t\t\t\t\t.then((result)=>{\r\n\r\n\t\t\t\t\t\t//console.log(result);\r\n\r\n\t\t\t\t\t\tres.status(200).json({\r\n\t\t\t\t\t\t\tresultcode : \"200\",\r\n\t\t\t\t\t\t\tresultmsg : \"success\"\r\n\t\t\t\t\t\t});\t\t\t\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t}).catch(err=>{\r\n\t\t\t\t\t\tlogger.error(err.toString());            \r\n\t\t\t\t\t\tres.status(500).json({\r\n\t\t\t\t\t\t\tresultcode : \"500\",\r\n\t\t\t\t\t\t\tresultmsg : \"save Error\"\r\n\t\t\t\t\t\t});\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t});\r\n\r\n\t\t\t}\r\n\t\t\t\r\n\t\t\t\r\n\t\t}).catch(err=>{\r\n\t\t\tlogger.error(err.toString());            \r\n\t\t\tres.status(500).json({\r\n\t\t\t\tresultcode : \"500\",\r\n\t\t\t\tresultmsg : \"save Error\"\r\n\t\t\t});\r\n\t\t\t\r\n\t\t});\r\n\r\n\r\n\t}\r\n\t\r\n\r\n\tvar check = checkval();\r\n\t//var saveexe =\r\n\tcheck.then(result =>{\r\n\t\t//console.log(result);\r\n\t\tif (result == true){\r\n\t\t\tsave()\r\n\t\t}else{\r\n\t\t\tres.status(400).json({\r\n\t\t\tresultcode : \"400\",\r\n\t\t\tresultmsg : \"BadRequest\"\r\n\t\t});\r\n\t\t}\r\n\r\n\t}).catch(err=>{\r\n\t\tres.status(500).json({\r\n\t\t\tresultcode : \"500\",\r\n\t\t\tresultmsg : err\r\n\t\t});\r\n\t});\r\n\t\r\n}\r\n\r\n\r\n//마이페이지수정 Post Method\r\nexports.mypage_post = (req,res, next)=>{\r\n\t\r\n\tlogger.info('Signup 처리 컨트롤러 호출 ');\r\n\t//console.log(req.body);\r\n\t\r\n\tlet userid = req.body.userid;\r\n\tlet username = req.body.username;\r\n\tlet email = req.body.useremail;\r\n\tlet password = req.body.password;\r\n\t\r\n\t//4개값 필수 체크\r\n\tvar checkval = function () {\t\t\r\n\t\treturn new Promise(function(resolve,rejected){\r\n\t\t\tif( userid =='' || username =='' || email =='' || password ==''){\r\n\t\t\t\tresolve(false);\r\n\t\t\t\t// res.status(400).json({\r\n\t\t\t\t// \tresultcode : \"400\",\r\n\t\t\t\t// \tresultmsg : \"BadRequest\"\r\n\t\t\t\t// });\r\n\t\t\r\n\t\t\t}else{\r\n\t\t\t\tresolve(true);\r\n\t\t\t}\r\n\t\t});\r\n\t\t\r\n\t}\r\n\r\n\t\t\r\n\tfunction save() {\r\n\r\n\t\r\n\t\tvar sql = \"update users set username =?, email = ?,password = ? where userid =?\";\r\n\t\tvar param = [username,email,utils.encryptSHA2(password),userid];\t\r\n\t\tpool.excuteSqlTx(sql,param)\r\n\t\t\t.then((result)=>{\r\n\r\n\t\t\t\t//console.log(result);\r\n\r\n\t\t\t\tres.status(200).json({\r\n\t\t\t\t\tresultcode : \"200\",\r\n\t\t\t\t\tresultmsg : \"success\"\r\n\t\t\t\t});\t\t\t\r\n\t\t\t\t\r\n\t\t\t}).catch(err=>{\r\n\t\t\t\tlogger.error(err.toString());            \r\n\t\t\t\tres.status(500).json({\r\n\t\t\t\t\tresultcode : \"500\",\r\n\t\t\t\t\tresultmsg : \"save Error\"\r\n\t\t\t\t});\r\n\t\t\t\t\r\n\t\t\t});\r\n\r\n\t\t\t\r\n\r\n\t}\r\n\t\r\n\r\n\tvar check = checkval();\r\n\t//var saveexe =\r\n\tcheck.then(result =>{\r\n\t\t//console.log(result);\r\n\t\tif (result == true){\r\n\t\t\tsave()\r\n\t\t}else{\r\n\t\t\tres.status(400).json({\r\n\t\t\tresultcode : \"400\",\r\n\t\t\tresultmsg : \"BadRequest\"\r\n\t\t});\r\n\t\t}\r\n\r\n\t}).catch(err=>{\r\n\t\tres.status(500).json({\r\n\t\t\tresultcode : \"500\",\r\n\t\t\tresultmsg : err\r\n\t\t});\r\n\t});\r\n\t\r\n}\r\n\n\n//# sourceURL=webpack:///./controllers/api/login.js?");

/***/ }),

/***/ "./controllers/dashboard.js":
/*!**********************************!*\
  !*** ./controllers/dashboard.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nconst Promise = __webpack_require__(/*! bluebird */ \"bluebird\");\r\n\r\nconst pool = __webpack_require__(/*! ../utils/pool */ \"./utils/pool.js\");\r\nconst logger = __webpack_require__(/*! ../utils/logger */ \"./utils/logger.js\");\r\n\r\n//dashboard Get Method\r\nexports.dashboard_get =(req,res, next)=>{\r\n\r\n\r\n\tlogger.info('대시보드 Get 호출');\r\n\t//console.log('userinfo',req.user.username);\r\n\tlet resultData =\"\";\r\n\tlet sql = \"select userid,username,inserttime from users where userid like ?\";\r\n\tlet param = [\"%%\"];\t\r\n\tpool.excuteSql(sql,param)\r\n\t\t.then((result)=>{\r\n\t\t\t   //console.log(\"2:\",new Date(), result); \r\n\t\t\t   resultData = result;\r\n\t\t\t   res.render('dashboard/dashboard.ejs',{data: resultData});\r\n\t\t\t  \r\n\t\t}).catch(err=>{\r\n            logger.error(err.toString());            \r\n\t\t\tresultData = [];\t\t\t\r\n\t\t\tres.render('dashboard/dashboard.ejs',{data: resultData});\r\n\t\t\t\r\n\t\t});\r\n\t\r\n}\n\n//# sourceURL=webpack:///./controllers/dashboard.js?");

/***/ }),

/***/ "./controllers/login.js":
/*!******************************!*\
  !*** ./controllers/login.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\n\r\n\r\n\r\nconst pool = __webpack_require__(/*! ../utils/pool */ \"./utils/pool.js\")\r\nconst logger = __webpack_require__(/*! ../utils/logger */ \"./utils/logger.js\");\r\n\r\n\r\n//로그인 화면 \r\nexports.login_get = (req,res, next)=>{\r\n\tres.render('login/login.ejs',{loginmessage : ''});\r\n\t\r\n}\r\n\r\n\r\n//회원가입\r\nexports.signup_get =(req,res, next)=>{\r\n\t\r\n\t\r\n\tres.render('login/signup.ejs')\r\n\t\r\n}\r\n\r\n//마이페이지\r\nexports.mypage_get = (req,res, next)=>{\r\n\r\n\tlogger.info('마이페이지 Get 호출');\r\n\t//console.log('userinfo',req.user.username);\r\n\t\r\n\t//console.log(\"session: \" ,req.user.userid)\r\n\tlet sql = \"select userid,username,email from users where userid = ?\";\r\n\tlet param = [req.user.userid];\t\r\n\tpool.excuteSql(sql,param)\r\n\t\t.then((result)=>{\t\t\t   \r\n\t\t\t   res.render('login/mypage.ejs',{data : result[0]});\r\n\t\t\t  \r\n\t\t}).catch(err=>{\r\n            logger.error(err.toString());            \r\n\t\t\tres.render('login/mypage.ejs',{data : err});\r\n\t\t\t\r\n\t\t\t\r\n\t\t});\r\n\t\r\n\r\n\t\r\n\t\r\n}\r\n\n\n//# sourceURL=webpack:///./controllers/login.js?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nconst http = __webpack_require__(/*! http */ \"http\");\nconst app = __webpack_require__(/*! ./app */ \"./app.js\");\n\n\nconst logger = __webpack_require__(/*! ./utils/logger */ \"./utils/logger.js\");\n\n\nconst port = process.env.PORT || 3000;\nconst server = http.createServer(app);\n\nserver.listen(port, function() {\n    logger.info(`Express's started on port : ${port}`)\n    \n})\n\n\n//# sourceURL=webpack:///./index.js?");

/***/ }),

/***/ "./routes/api.js":
/*!***********************!*\
  !*** ./routes/api.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nconst express = __webpack_require__(/*! express */ \"express\");\r\nconst router = express.Router();\r\n\r\nconst APILogin = __webpack_require__(/*! ../controllers/api/login */ \"./controllers/api/login.js\");\r\n\r\nrouter.post('/signup',APILogin.signup_post);\r\nrouter.post('/mypage',APILogin.mypage_post);\r\n\r\n\r\nmodule.exports = router;\n\n//# sourceURL=webpack:///./routes/api.js?");

/***/ }),

/***/ "./routes/dashboard.js":
/*!*****************************!*\
  !*** ./routes/dashboard.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst express = __webpack_require__(/*! express */ \"express\");\nconst router = express.Router();\n\nconst DashboardController = __webpack_require__(/*! ../controllers/dashboard */ \"./controllers/dashboard.js\");\n\nrouter.get('/',DashboardController.dashboard_get);\n\nmodule.exports = router;\n\n//# sourceURL=webpack:///./routes/dashboard.js?");

/***/ }),

/***/ "./routes/login.js":
/*!*************************!*\
  !*** ./routes/login.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\n\r\nconst express = __webpack_require__(/*! express */ \"express\");\r\nconst router = express.Router();\r\nconst passport = __webpack_require__(/*! passport */ \"passport\");\r\n\r\nconst LoginController = __webpack_require__(/*! ../controllers/login */ \"./controllers/login.js\");\r\n\r\nrouter.get('/',LoginController.login_get);\r\nrouter.post('/', passport.authenticate('local', {\r\n    //successRedirect: '/login/loginSuccess',\r\n    failureRedirect: '/login/loginFailure'\r\n    }), (req, res) => {\r\n        console.log('Login success.')\r\n        res.redirect('/');\r\n      });\r\n\r\nrouter.get('/loginFailure', (req,res,next)=>{    \r\n    res.render('login/login.ejs',{loginmessage : '아이디와비번을 확인하세요'});\r\n    \r\n    \r\n});\r\n\r\nrouter.get('/signup',LoginController.signup_get);\r\nrouter.get('/mypage',LoginController.mypage_get);\r\n\r\nmodule.exports = router\n\n//# sourceURL=webpack:///./routes/login.js?");

/***/ }),

/***/ "./routes/logout.js":
/*!**************************!*\
  !*** ./routes/logout.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\n\r\nconst express = __webpack_require__(/*! express */ \"express\");\r\nconst router = express.Router();\r\nconst logger = __webpack_require__(/*! ../utils/logger */ \"./utils/logger.js\");\r\n\r\nrouter.get('/',(req,res, next)=>{\r\n\r\n    \r\n    \r\n    \r\n    req.session.destroy(function(err){\r\n        // cannot access session here\r\n        if(err){\r\n            logger.error(\"로그아웃 에러(session.distory)\");\r\n            //res.redirect('/')\r\n        }\r\n        res.redirect('/');\r\n        //res.render('index.ejs');\r\n     });\r\n\r\n    \r\n});\r\n\r\n\r\nmodule.exports = router\n\n//# sourceURL=webpack:///./routes/logout.js?");

/***/ }),

/***/ "./routes/main.js":
/*!************************!*\
  !*** ./routes/main.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const express = __webpack_require__(/*! express */ \"express\");\nconst router = express.Router();\n``\n//const LoginController = \n\nrouter.get('/',(req,res, next)=>{\n\tres.render('index.ejs')\n})\n\nmodule.exports = router\n\n//# sourceURL=webpack:///./routes/main.js?");

/***/ }),

/***/ "./utils/logger.js":
/*!*************************!*\
  !*** ./utils/logger.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nconst { createLogger, format, transports } = __webpack_require__(/*! winston */ \"winston\");\r\nconst appRoot = __webpack_require__(/*! app-root-path */ \"app-root-path\");    // app root 경로를 가져오는 l\r\n\r\n__webpack_require__(/*! winston-daily-rotate-file */ \"winston-daily-rotate-file\")\r\n\r\nconst fs = __webpack_require__(/*! fs */ \"fs\")\r\n\r\nconst env = \"development\" || false;\r\n\r\nconst logDir = appRoot.path + '/logs';\r\n\r\nconsole.log(logDir);\r\n\r\n//Create the log directory if it does not exist\r\nif (!fs.existsSync(logDir)) {\r\n\tfs.mkdirSync(logDir)\r\n}\r\n\r\nconst dailyRotateFileTransport = new transports.DailyRotateFile({\r\n  level: \"debug\",\r\n  filename: `${logDir}/node-dashboard_%DATE%.log`,\r\n  datePattern: \"YYYYMMDD\",\r\n  zippedArchive: true,\r\n  maxSize: \"20m\",\r\n  maxFiles: \"3d\"\r\n})\r\n\r\nconst logger = createLogger({\r\n  level: env === \"development\" ? \"debug\" : \"info\",\r\n  format: format.combine(\r\n    format.timestamp({\r\n      format: \"YYYY-MM-DD HH:mm:ss\"\r\n    }),\r\n    //format.json()\r\n    format.printf(\r\n      info => `${info.timestamp} ${info.level}: ${info.message}`\r\n    )\r\n  ),\r\n  transports: [\r\n    new transports.Console({\r\n      level: \"info\",\r\n      format: format.combine(\r\n        format.colorize(),\r\n        format.printf(\r\n          info => `${info.timestamp} ${info.level}: ${info.message}`\r\n        )\r\n      )\r\n    }),\r\n    dailyRotateFileTransport\r\n  ]\r\n})\r\n\r\nmodule.exports = logger\r\n\r\n// const appRoot = require('app-root-path')    // app root 경로를 가져오는 lib\r\n//       ,winston = require('winston')            // winston lib\r\n//       ,moment = require('moment-timezone')\r\n//       ,process = require('process');\r\n\r\n// var winstonDaily = require(\"winston-daily-rotate-file\")\r\n\r\n \r\n// const { combine, timestamp, label, printf } = winston.format;\r\n \r\n// const myFormat = printf(({ level, message, label, timestamp }) => {\r\n//   var localtimestamp = moment(timestamp).tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss.SSS ZZ');\r\n//   return `${localtimestamp} [${label}] ${level}: ${message}`;    // log 출력 포맷 정의\r\n// });\r\n\r\n// const options = {\r\n//   // log파일\r\n//   file: {\r\n//     level: 'info',\r\n//     filename: `${appRoot}/logs/node-dashboard_%DATE%.log`, // 로그파일을 남길 경로\r\n//     datePattern: \"YYYY-MM-DD\",\r\n//     handleExceptions: true,\r\n//     json: false,\r\n//     maxsize: 5242880, // 5MB\r\n//     maxFiles: 5,\r\n//     colorize: false,\r\n//     format: combine(\r\n//       label({ label: 'node-dashboard' }),\r\n//       timestamp(),\r\n//       myFormat    // log 출력 포맷\r\n//     )\r\n//   },\r\n//   // 개발 시 console에 출력\r\n//   console: {\r\n//     level: 'debug',\r\n//     handleExceptions: true,\r\n//     json: false, // 로그형태를 json으로도 뽑을 수 있다.\r\n//     colorize: true,\r\n//     format: combine(\r\n//       label({ label: 'node-dashboard' }),\r\n//       timestamp(),\r\n//       myFormat\r\n//     )\r\n//   }\r\n// }\r\n \r\n// let logger = new winston.createLogger({\r\n//   transports: [\r\n//     new winston.transports.File(options.file) // 중요! 위에서 선언한 option으로 로그 파일 관리 모듈 transport\r\n//   ],\r\n//   exitOnError: false, \r\n// });\r\n \r\n// if(process.env.NODE_ENV !== 'production'){\r\n//   logger.add(new winston.transports.Console(options.console)) // 개발 시 console로도 출력\r\n// }\r\n \r\n// module.exports = logger;\r\n\n\n//# sourceURL=webpack:///./utils/logger.js?");

/***/ }),

/***/ "./utils/passport.js":
/*!***************************!*\
  !*** ./utils/passport.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const passport = __webpack_require__(/*! passport */ \"passport\");\r\nconst LocalStrategy = __webpack_require__(/*! passport-local */ \"passport-local\").Strategy;\r\n\r\nconst utils = __webpack_require__(/*! ../utils/utils */ \"./utils/utils.js\");\r\nconst pool = __webpack_require__(/*! ../utils/pool */ \"./utils/pool.js\");\r\nconst logger = __webpack_require__(/*! ../utils/logger */ \"./utils/logger.js\");\r\n\r\nmodule.exports = () =>{\r\n\r\n    passport.serializeUser(function (user, done) {\r\n        done(null, user)\r\n    });\r\n      \r\n    passport.deserializeUser(function (user, done) {\r\n        \r\n        let sql = \"select userid,username,email from users where userid = ?\";\r\n        let param = [user.user_id];\t\r\n        //console.log(\"userinfo1 : \", user.user_name);\r\n        pool.excuteSql(sql,param)\r\n          .then((result)=>{    \r\n            //console.log(\"userinfo : \", result[0]);\r\n            done(null, result[0]);        \r\n              \r\n          }).catch(err=>{\r\n            done(null, user);          \r\n            \r\n          });\r\n\r\n    });\r\n      \r\n\r\n    passport.use(new LocalStrategy({\r\n        usernameField: 'username',\r\n        passwordField: 'password',\r\n        session: true, // 세션에 저장 여부\r\n        passReqToCallback: true\r\n      }, function ( req, username, password, done) {\r\n\r\n\r\n        \r\n        let sql = \"select userid,username,password from users where userid = ?\";\r\n        let param = [username];\t\r\n        pool.excuteSql(sql,param)\r\n          .then((result)=>{              \r\n              if(username === result[0].userid && utils.encryptSHA2(password) === result[0].password){\r\n                return done(null, {\r\n                  'user_id': username,\r\n                  'user_name': result.username\r\n                });\r\n              }else{\r\n                //return done(false, null)\r\n                logger.info(\"로그인 실패 ID : '\"+ username+ \"'\");  \r\n                return done(null, false, { message: '비밀번호가 틀렸습니다' }); // 임의 에러 처리\r\n              }\r\n              \r\n              \r\n          }).catch(err=>{\r\n                  logger.error(err.toString());            \r\n            \r\n            return done(null, false, { message: '비밀번호가 틀렸습니다' }); // 임의 에러 처리\r\n            \r\n          });\r\n          \r\n          \r\n          \r\n          \r\n    }));\r\n    \r\n\r\n}\r\n\r\n\n\n//# sourceURL=webpack:///./utils/passport.js?");

/***/ }),

/***/ "./utils/pool.js":
/*!***********************!*\
  !*** ./utils/pool.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\n\r\nconst mysql = __webpack_require__(/*! mysql2/promise */ \"mysql2/promise\")\r\n \r\nconst opts = {\r\n    host:'localhost',\r\n    user:'root',\r\n\tpassword:'123456',\r\n\tport: 3326,\r\n\tdatabase:'nodejs',\r\n\tconnectionLimit: 50\r\n\t\r\n}\r\n\r\nconst pool = mysql.createPool(opts);\r\n\r\n\r\n\r\n\r\nmodule.exports.excuteSql =  async function(sql,params) {\r\n    \r\n\ttry{\r\n\t\tconst connection = await pool.getConnection(async conn=>conn);\r\n\t\ttry{\t\t\t\r\n\t\t\tconst [rows] = await connection.query(sql,params);\t\t\t\r\n\t\t\tconnection.release();\r\n\t\t\treturn rows;\r\n\t\t}catch(e1){\t\t\t\r\n\t\t\tconnection.release();\r\n\t\t\t//console.log('Query Error!'+ e1);\r\n\t\t\tthrow new Error(\"connection.query :\" + e1);\r\n\t\t\t\r\n\t\t}\r\n\t}catch(e2){\r\n\t\t//console.log('DB Connection Error!');\r\n\t\tthrow new Error(\"pool.getConnection : \" + e2);\r\n\t\t\r\n\t\t\r\n\t}\r\n\t\r\n        \r\n};\r\n\r\n\r\nmodule.exports.excuteSqlTx =  async function(sql,params) {\r\n    \r\n\ttry{\r\n\t\tconst connection = await pool.getConnection(async conn=>conn);\r\n\t\ttry{\r\n\t\t\t\r\n\t\t\tawait connection.beginTransaction();\r\n\t\t\tconst [rows] = await connection.query(sql,params);\r\n\r\n\t\t\tawait connection.commit();\r\n\t\t\tconnection.release();\r\n\t\t\treturn rows;\r\n\t\t}catch(e1){\r\n\t\t\tawait connection.rollback();\r\n\t\t\tconnection.release();\r\n\t\t\t//console.log('Query Error!');\r\n\t\t\tthrow new Error(\"connection.query :\" + e1);\r\n\t\t\t\r\n\t\t}\r\n\t}catch(e2){\r\n\t\t//console.log('DB Connection Error!');\r\n\t\tthrow new Error(\"pool.getConnection : \" + e2);\t\t\r\n\t\t\r\n\t}\r\n\t\r\n        \r\n};\r\n \r\n \r\n\r\n \r\n// var sql = 'select userid,username,inserttime from users where userid=?';\r\n// var param = [\"cis\"]\r\n// var sql2 = 'select userid,username,inserttime from users where userid=?';\r\n// var param2 = [\"hgd\"]\r\n\r\n// var sql3 = 'select userid,username,inserttime from users where userid=?';\r\n// var param3 = [\"lss\"]\r\n\r\n// excuteSql(sql,param)\r\n// \t.then((res)=>{\r\n// \t\t   console.log(\"1:\", res); \r\n// \t\t   return excuteSql(sql2,param2)\r\n// \t})\r\n// \t.then((res)=>{\r\n// \t\tconsole.log(\"2:\", res); \r\n// \t\treturn excuteSql(sql3,param3)\r\n//  \t})\r\n// \t.then((res)=>{\r\n// \t\tconsole.log(\"3:\", res); \r\n// \t}).catch(err=>{\r\n// \t\tconsole.log(\"err : \", err)\r\n// \t});\r\n\r\n\n\n//# sourceURL=webpack:///./utils/pool.js?");

/***/ }),

/***/ "./utils/utils.js":
/*!************************!*\
  !*** ./utils/utils.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Crypto = __webpack_require__(/*! crypto-js */ \"crypto-js\"),\r\n      SHA256 = ('crypto-js/sha256');\r\n\r\n\r\nconst EKEY =\"mySecretkey12314123u8dkl234\";\r\n\r\nmodule.exports = {\r\n\r\n    encryptSHA2(data, key){\r\n        if(!data) return null;\r\n        key = key || EKEY;\r\n        try{\r\n            return Crypto.SHA256(data + key).toString();\r\n        }catch(err){\r\n            throw new Error(\"encryptSha256 Error\");\r\n        }\r\n    },\r\n\r\n    encrypt(data, key){\r\n        return Crypto.AES.encrypt(data, key || EKEY).toString();\r\n    },\r\n\r\n    decrypt(data, key){\r\n        return Crypto.AES.decrypt(data, key || EKEY).toString(Crypto.enc.Utf8);\r\n    }\r\n}\r\n        \n\n//# sourceURL=webpack:///./utils/utils.js?");

/***/ }),

/***/ "app-root-path":
/*!********************************!*\
  !*** external "app-root-path" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"app-root-path\");\n\n//# sourceURL=webpack:///external_%22app-root-path%22?");

/***/ }),

/***/ "bluebird":
/*!***************************!*\
  !*** external "bluebird" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"bluebird\");\n\n//# sourceURL=webpack:///external_%22bluebird%22?");

/***/ }),

/***/ "connect-redis":
/*!********************************!*\
  !*** external "connect-redis" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"connect-redis\");\n\n//# sourceURL=webpack:///external_%22connect-redis%22?");

/***/ }),

/***/ "crypto-js":
/*!****************************!*\
  !*** external "crypto-js" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"crypto-js\");\n\n//# sourceURL=webpack:///external_%22crypto-js%22?");

/***/ }),

/***/ "ejs-locals":
/*!*****************************!*\
  !*** external "ejs-locals" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"ejs-locals\");\n\n//# sourceURL=webpack:///external_%22ejs-locals%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "express-session":
/*!**********************************!*\
  !*** external "express-session" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express-session\");\n\n//# sourceURL=webpack:///external_%22express-session%22?");

/***/ }),

/***/ "file-stream-rotator":
/*!**************************************!*\
  !*** external "file-stream-rotator" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"file-stream-rotator\");\n\n//# sourceURL=webpack:///external_%22file-stream-rotator%22?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs\");\n\n//# sourceURL=webpack:///external_%22fs%22?");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"http\");\n\n//# sourceURL=webpack:///external_%22http%22?");

/***/ }),

/***/ "moment-timezone":
/*!**********************************!*\
  !*** external "moment-timezone" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"moment-timezone\");\n\n//# sourceURL=webpack:///external_%22moment-timezone%22?");

/***/ }),

/***/ "morgan":
/*!*************************!*\
  !*** external "morgan" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"morgan\");\n\n//# sourceURL=webpack:///external_%22morgan%22?");

/***/ }),

/***/ "mysql2/promise":
/*!*********************************!*\
  !*** external "mysql2/promise" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"mysql2/promise\");\n\n//# sourceURL=webpack:///external_%22mysql2/promise%22?");

/***/ }),

/***/ "passport":
/*!***************************!*\
  !*** external "passport" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"passport\");\n\n//# sourceURL=webpack:///external_%22passport%22?");

/***/ }),

/***/ "passport-local":
/*!*********************************!*\
  !*** external "passport-local" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"passport-local\");\n\n//# sourceURL=webpack:///external_%22passport-local%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ }),

/***/ "redis":
/*!************************!*\
  !*** external "redis" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"redis\");\n\n//# sourceURL=webpack:///external_%22redis%22?");

/***/ }),

/***/ "serve-favicon":
/*!********************************!*\
  !*** external "serve-favicon" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"serve-favicon\");\n\n//# sourceURL=webpack:///external_%22serve-favicon%22?");

/***/ }),

/***/ "winston":
/*!**************************!*\
  !*** external "winston" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"winston\");\n\n//# sourceURL=webpack:///external_%22winston%22?");

/***/ }),

/***/ "winston-daily-rotate-file":
/*!********************************************!*\
  !*** external "winston-daily-rotate-file" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"winston-daily-rotate-file\");\n\n//# sourceURL=webpack:///external_%22winston-daily-rotate-file%22?");

/***/ })

/******/ });