const utils = require('./utils');

let str = "NodejsTest";
console.log('encrypt : ',utils.encrypt(str));
console.log('decrypt : ',utils.decrypt(utils.encrypt(str)));
console.log('Sha256 : ', utils.encryptSHA2(str))