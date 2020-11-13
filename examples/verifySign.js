const naclUtil = require("../lib/TweetNaClUtil")

const message = "TESTE"
const sign = "w0NbYvoJK33pc+dAVQWgqnEPl9Q1MUvDP0MlG2oR9nqwsSmNsCN6HETRpSNWp0hco2aozX2MNSoaZKdFcvb0Bw=="
const pubKey = "hBGvKYq/RQlHpaX876fZ8W0H54hgyFp7b+hhDCSPKLU="

console.log("Message: "+message);
console.log("Signature: "+sign);
console.log("publicKey: "+pubKey);

const isValid = naclUtil.verify(pubKey, sign, message)

console.log("\nSIGNATURE IS VALID? "+isValid)
return isValid