const naclUtil = require("./TweetNaClUtil")

const keys = naclUtil.generateKeyPair();
const message = "TESTE"

const sign = naclUtil.sign(message, keys.secretKey)

console.log("Secret Key: "+keys.secretKey)
console.log("Public Key: "+keys.publicKey)
console.log("Message: "+message)
console.log("Sign: "+sign)

return sign
