//@Author: Faria-sys
//Last-update: 28/07/2022 by Faria-sys
//File description: Encripta uma string
// Reference - https://www.npmjs.com/package/crypto-js

const CryptoJS = require("crypto-js")

function digestString(message){
    var hash = CryptoJS.MD5(message).toString()
    return hash;
}

module.exports = digestString;