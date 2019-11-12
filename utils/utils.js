const Crypto = require('crypto-js'),
      SHA256 = ('crypto-js/sha256');


const EKEY ="mySecretkey12314123u8dkl234";

module.exports = {
    encrypt(data, key){
        return Crypto.AES.encrypt(data, key || EKEY).toString();
    },

    decrypt(data, key){
        return Crypto.AES.decrypt(data, key || EKEY).toString(Crypto.enc.Utf8);
    }
}
        