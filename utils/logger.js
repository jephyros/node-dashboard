"use strict"
const { createLogger, format, transports } = require("winston");
const appRoot = require('app-root-path');    // app root 경로를 가져오는 l

require("winston-daily-rotate-file")

const fs = require("fs")

const env = process.env.NODE_ENV || "development";

const logDir = appRoot.path + '/logs';

console.log(logDir);

//Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
	fs.mkdirSync(logDir)
}

const dailyRotateFileTransport = new transports.DailyRotateFile({
  level: "debug",
  filename: `${logDir}/node-dashboard_%DATE%.log`,
  datePattern: "YYYYMMDD",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "14d"
})

const logger = createLogger({
  level: env === "development" ? "debug" : "info",
  format: format.combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss"
    }),
    //format.json()
    format.printf(
      info => `${info.timestamp} ${info.level}: ${info.message}`
    )
  ),
  transports: [
    new transports.Console({
      level: "info",
      format: format.combine(
        format.colorize(),
        format.printf(
          info => `${info.timestamp} ${info.level}: ${info.message}`
        )
      )
    }),
    dailyRotateFileTransport
  ]
})

module.exports = logger

// const appRoot = require('app-root-path')    // app root 경로를 가져오는 lib
//       ,winston = require('winston')            // winston lib
//       ,moment = require('moment-timezone')
//       ,process = require('process');

// var winstonDaily = require("winston-daily-rotate-file")

 
// const { combine, timestamp, label, printf } = winston.format;
 
// const myFormat = printf(({ level, message, label, timestamp }) => {
//   var localtimestamp = moment(timestamp).tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss.SSS ZZ');
//   return `${localtimestamp} [${label}] ${level}: ${message}`;    // log 출력 포맷 정의
// });

// const options = {
//   // log파일
//   file: {
//     level: 'info',
//     filename: `${appRoot}/logs/node-dashboard_%DATE%.log`, // 로그파일을 남길 경로
//     datePattern: "YYYY-MM-DD",
//     handleExceptions: true,
//     json: false,
//     maxsize: 5242880, // 5MB
//     maxFiles: 5,
//     colorize: false,
//     format: combine(
//       label({ label: 'node-dashboard' }),
//       timestamp(),
//       myFormat    // log 출력 포맷
//     )
//   },
//   // 개발 시 console에 출력
//   console: {
//     level: 'debug',
//     handleExceptions: true,
//     json: false, // 로그형태를 json으로도 뽑을 수 있다.
//     colorize: true,
//     format: combine(
//       label({ label: 'node-dashboard' }),
//       timestamp(),
//       myFormat
//     )
//   }
// }
 
// let logger = new winston.createLogger({
//   transports: [
//     new winston.transports.File(options.file) // 중요! 위에서 선언한 option으로 로그 파일 관리 모듈 transport
//   ],
//   exitOnError: false, 
// });
 
// if(process.env.NODE_ENV !== 'production'){
//   logger.add(new winston.transports.Console(options.console)) // 개발 시 console로도 출력
// }
 
// module.exports = logger;
