const appRoot = require('app-root-path')    // app root 경로를 가져오는 lib
      ,winston = require('winston')            // winston lib
      //,moment = require('moment-timezone')
      ,process = require('process');
      
 
const { combine, timestamp, label, printf } = winston.format;
 
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;    // log 출력 포맷 정의
});

// const appendTimestamp = winston.format((info, opts) => {
//   if(opts.tz)
//     info.timestamp = moment().tz(opts.tz).format();
//   return info;
// });
 
const options = {
  // log파일
  file: {
    level: 'info',
    filename: `${appRoot}/logs/node-dashboard.log`, // 로그파일을 남길 경로
    handleExceptions: true,
    json: false,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
    format: combine(
      label({ label: 'node-dashboard' }),
      timestamp(),
      myFormat    // log 출력 포맷
    )
  },
  // 개발 시 console에 출력
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false, // 로그형태를 json으로도 뽑을 수 있다.
    colorize: true,
    format: combine(
      label({ label: 'nba_express' }),
      timestamp(),
      myFormat
    )
  }
}
 
let logger = new winston.createLogger({
  transports: [
    new winston.transports.File(options.file) // 중요! 위에서 선언한 option으로 로그 파일 관리 모듈 transport
  ],
  exitOnError: false, 
});
 
if(process.env.NODE_ENV !== 'production'){
  logger.add(new winston.transports.Console(options.console)) // 개발 시 console로도 출력
}
 
module.exports = logger;
